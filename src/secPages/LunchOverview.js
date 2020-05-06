import React, { Component } from 'react';
import Table from 'react-bootstrap/Table'

import 'react-moment'
import dateHelper from '../service/dateHelper'
import Navbar from '../components/navbar/navbar'

import LunchItem from '../components/LunchItem'
import { Row, Container, Col, Button, Alert } from 'react-bootstrap';
import { Calendar, Person, ArrowLeft, ArrowRight } from 'react-bootstrap-icons'

import { getAllLunchesForUser } from '../service/lunchService'

import '../css/LunchOverview.css'
import moment from 'moment';


class LunchOverview extends Component {

    constructor(props) {
        super(props)

        this.state = {
            lunches: [],
            filteredLunches: [],

            filterValue: 'month',
            currentMonth: new Date().getMonth(),
            currentWeek: 0,
            currentWeekNr: dateHelper.getWeek(Date())
        }
    }

    componentDidMount() {
        getAllLunchesForUser().then((data) => {
            console.log(data.data)
            this.setState({ lunches: data.data, filteredLunches: data.data })
            this.filterLunches()
        })
    }

    filterLunches() {
        if (this.state.filterValue === 'month') {

            this.setState({
                filteredLunches: this.state.lunches.filter((item) => {
                    return new Date(item.date).getMonth() === this.state.currentMonth
                })
            })

            return
        }

        var beginWeek = moment().startOf('week').add(1, 'day').subtract(this.state.currentWeek, 'week')._d;
        var endWeek = moment().startOf('week').subtract(this.state.currentWeek - 1, 'week')._d;

        if (this.state.filterValue === 'week') {
            this.setState({
                filteredLunches: this.state.lunches.filter((item) => {
                    return new Date(item.date) >= beginWeek &&
                        new Date(item.date) <= endWeek
                })
            })

        }
    }


    render() {
        const { filteredLunches, currentMonth, currentWeek, currentWeekNr, filterValue } = this.state;

        const setFilterValue = (newFilterValue) => {
            this.setState({
                currentMonth: new Date().getMonth(),
                startWeek: moment().startOf('day').subtract(1, 'week')._d,
                endWeek: new Date(),
                filterValue: newFilterValue
            })

            filterByCurrent()
        }

        const filterByCurrent = () => {
            this.setState({
                currentMonth: new Date().getMonth(),
                currentWeek: 0,
                currentWeekNr: dateHelper.getWeek(Date())
            }, () => {
                this.filterLunches();
            })
        }

        const filterByNext = () => {
            if (this.state.currentMonth < 11) {
                this.setState({ currentMonth: currentMonth + 1 })
            }

            if (this.state.currentWeekNr < 52) {
                this.setState({ currentWeekNr: currentWeekNr + 1 })
            }

            this.setState({ currentWeek: currentWeek - 1 }, () => {
                this.filterLunches();
            })
        }

        const filterByPrevious = () => {
            if (this.state.currentMonth > 0) {
                this.setState({ currentMonth: currentMonth - 1 }, () => {
                    this.filterLunches();
                })
            }

            if (this.state.currentWeekNr > 1) {
                this.setState({ currentWeekNr: currentWeekNr - 1 })
            }

            this.setState({ currentWeek: currentWeek + 1 }, () => {
                this.filterLunches();
            })
        }

        const deleteLunch = (lunchId) => {
            const newLunches = this.state.lunches.filter(lunch => lunch.id !== lunchId)
            this.setState({lunches: newLunches, filteredLunches: newLunches})
            this.filterLunches()
        }


        return (
            <div className="flexboxes">
                <div className="leftpanel">
                    <Navbar />
                </div>
                <div className="rightpanel">
                    <React.Fragment>
                        <div>
                            <Container>
                                <Row >
                                    <Col><h1>Overzicht lunch</h1></Col>
                                </Row>
                                <Row><Col>
                                    {this.state.filterValue === 'month' ?
                                        <h4>Huidige maand: {dateHelper.getMonthFromNumber(this.state.currentMonth)}</h4> :
                                        <h4>Huidig week: {this.state.currentWeekNr}</h4>}
                                </Col></Row>

                                {this.state.filterValue === 'week' ?
                                    <Row>
                                        <Col><Button onClick={() => { setFilterValue('week') }} variant="success" size="sm" block>Week</Button></Col>
                                        <Col><Button onClick={() => { setFilterValue('month') }} variant="info" size="sm" block>Maand</Button></Col>
                                    </Row>
                                    :
                                    <Row>
                                        <Col><Button onClick={() => { setFilterValue('week') }} variant="info" size="sm" block>Week</Button></Col>
                                        <Col><Button onClick={() => { setFilterValue('month') }} variant="success" size="sm" block>Maand</Button></Col>
                                    </Row>
                                }

                                <Row>
                                    <Col><Button onClick={() => { filterByPrevious() }} variant="outline-primary" size="sm" block><ArrowLeft></ArrowLeft></Button></Col>
                                    <Col><Button onClick={() => { filterByCurrent() }} variant="outline-primary" size="sm" block>Vandaag</Button></Col>
                                    <Col><Button onClick={() => { filterByNext() }} variant="outline-primary" size="sm" block><ArrowRight></ArrowRight></Button></Col>
                                </Row>
                                <Table size="sm" variant="dark" striped bordered>
                                    <thead>
                                        <tr>
                                            <th><Person></Person></th>
                                            <th><Calendar></Calendar></th>
                                            <th>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredLunches.map((item) => (
                                            <LunchItem callback={() => deleteLunch(item.id)} key={item.id} lunch={item} />
                                        ))}
                                    </tbody>
                                </Table>
                                {filteredLunches[0] === null && filterValue === "month" &&
                                    <Row><Col><Alert variant="warning">Er zijn geen lunches deze maand</Alert></Col></Row>}
                                {filteredLunches[0] === null && filterValue === "week" &&
                                    <Row><Col><Alert variant="warning">Er zijn geen lunches deze week</Alert></Col></Row>
                                }
                                <Row >
                            <Col><Button variant="primary" size="lg" block>Exporteren</Button></Col>
                        </Row>
                            </Container>
                        </div>
                        
                    </React.Fragment >
                </div>
            </div>
        )
    }

}

export default LunchOverview