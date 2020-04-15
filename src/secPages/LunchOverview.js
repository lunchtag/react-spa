import React, { Component } from 'react';
import Table from 'react-bootstrap/Table'

import 'react-moment'
//import Auth from '../service/auth'
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

            currentWeek: 0
        }
        

        this.getLunches()
    }



    setFilterValue(newFilterValue) {
        this.state.currentMonth = new Date().getMonth()
        this.state.startWeek = moment().startOf('day').subtract(1, 'week')._d
        this.state.endWeek = new Date()

        this.state.filterValue = newFilterValue

        this.filterByCurrent()
        this.forceUpdate()
    }

    getLunches() {
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
                this.setState({ lunches: data })

                this.state.filteredLunches = this.state.lunches
                this.forceUpdate()
            })
    }

    filterByCurrent() {
        this.state.currentMonth = new Date().getMonth()
        this.state.currentWeek = 0

        this.filterLunches()
    }

    filterByNext() {
        if (this.state.currentMonth < 12) {
            this.state.currentMonth++
        }
        this.state.currentWeek--

        this.filterLunches()
    }

    filterByPrevious() {
        if (this.state.currentMonth > 0) {
            this.state.currentMonth--
        }
        this.state.currentWeek++

        this.filterLunches()
    }

    filterLunches() {
        if (this.state.filterValue === 'month') {

            this.setState({filteredLunches: this.state.lunches.filter((item) => {
                return new Date(item.date).getMonth() === this.state.currentMonth
            })})

            this.forceUpdate()
            return
        }

        var beginWeek = moment().startOf('week').add(1, 'day').subtract(this.state.currentWeek, 'week')._d;
        var endWeek = moment().startOf('week').subtract(this.state.currentWeek - 1, 'week')._d;

        if (this.state.filterValue === 'week') {
            this.setState({filteredLunches: this.state.lunches.filter((item) => {
                return new Date(item.date) >= beginWeek &&
                    new Date(item.date) <= endWeek
            })})
            this.forceUpdate()
        }
    }


    render() {
        const { filteredLunches } = this.state;
        return (
            <div className="flexboxes">
                <div className="leftpanel">
                    <Navbar/>
                </div>
                <div className="rightpanel">
                <React.Fragment>
                <div>
                    <Row>
                        <Col><Button onClick={() => { this.filterByPrevious() }} variant="outline-primary" size="lg" block>Vorige</Button></Col>
                        <Col><Button onClick={() => { this.filterByCurrent() }} variant="outline-primary" size="lg" block>Huidige</Button></Col>
                        <Col><Button onClick={() => { this.filterByNext() }} variant="outline-primary" size="lg" block>Volgende</Button></Col>
                    </Row>
                    <Container>
                        <Row >
                            <Col><h1>Overzicht lunch</h1></Col>
                        </Row>
                        <Row><Col>
                            {this.state.filterValue === 'month' ?
                                <h4>Huidig maandnummer: {this.state.currentMonth}</h4> :
                                <h4>Huidig week: {this.state.currentWeek}</h4>}
                        </Col></Row>


                        {this.state.filterValue === 'week' ?
                            <Row>
                                <Col><Button onClick={() => { this.setFilterValue('week') }} variant="success" size="sm" block>Week</Button></Col>
                                <Col><Button onClick={() => { this.setFilterValue('month') }} variant="info" size="sm" block>Maand</Button></Col>
                            </Row>
                            :
                            <Row>
                                <Col><Button onClick={() => { this.setFilterValue('week') }} variant="info" size="sm" block>Week</Button></Col>
                                <Col><Button onClick={() => { this.setFilterValue('month') }} variant="success" size="sm" block>Maand</Button></Col>
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