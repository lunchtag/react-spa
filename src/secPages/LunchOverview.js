import React, { Component } from 'react';
import Table from 'react-bootstrap/Table'

import 'react-moment'
import dateHelper from '../service/dateHelper'
import Navbar from '../components/navbar/navbar'

import LunchItem from '../components/LunchItem'
import { Row, Container, Col, Button } from 'react-bootstrap';

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
        const url = 'https://lunchtag-resource-server.herokuapp.com/lunch/all'
        fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + window.sessionStorage.getItem("token")
            }
        })
            .then(res => res.json()).catch()
            .then((data) => {
                this.setState({ lunches: data, filteredLunches: data })
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
        const { filteredLunches, currentMonth, currentWeek, currentWeekNr } = this.state;

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


        return (
            <div className="flexboxes">
                <div className="leftpanel">
                    <Navbar />
                </div>
                <div className="rightpanel">
                    <React.Fragment>
                        <div>
                            <Row>
                                <Col><Button onClick={() => { filterByPrevious() }} variant="outline-primary" size="lg" block>Vorige</Button></Col>
                                <Col><Button onClick={() => { filterByCurrent() }} variant="outline-primary" size="lg" block>Huidige</Button></Col>
                                <Col><Button onClick={() => { filterByNext() }} variant="outline-primary" size="lg" block>Volgende</Button></Col>
                            </Row>
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


                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>Naam</th>
                                            <th>Datum</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredLunches.map((item) => (

                                            <LunchItem key={item.id} lunch={item} />
                                        ))}
                                    </tbody>
                                </Table>
                            </Container>
                        </div>
                        <Row >
                            <Col><Button variant="primary" size="lg" block>Lunch toevoegen</Button></Col>
                            <Col><Button variant="primary" size="lg" block>Exporteren</Button></Col>
                        </Row>
                    </React.Fragment >
                </div>
            </div>
        )
    }

}

export default LunchOverview