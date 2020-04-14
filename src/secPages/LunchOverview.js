import React, { Component } from 'react';
import Table from 'react-bootstrap/Table'

import 'react-moment'
import Auth from '../service/auth'

import LunchItem from '../components/LunchItem'
import { Row, Container, Col, Button } from 'react-bootstrap';

import '../css/LunchOverview.css'
import moment from 'moment';


class LunchOverview extends Component {

    constructor(props) {
        super(props)

        this.state = {
            lunches: [{
                date: new Date("2020-04-08T09:22:48.939Z"),
                lunchID: 0,
                name: "jorg"
            },
            {
                date: new Date("2020-04-12T09:22:48.939Z"),
                lunchID: 1,
                name: "rens"
            },
            {
                date: new Date("2020-04-15T09:22:48.939Z"),
                lunchID: 2,
                name: "odin"
            },
            {
                date: new Date("2020-05-08T09:22:48.939Z"),
                lunchID: 3,
                name: "karin"
            },
            {
                date: new Date("2020-05-12T09:22:48.939Z"),
                lunchID: 4,
                name: "niray"
            },
            {
                date: new Date("2020-05-15T09:22:48.939Z"),
                lunchID: 5,
                name: "sander"
            },
            ],
            filteredLunches: [],



            filterValue: 'month',
            currentMonth: new Date().getMonth(),

            currentWeek: 1
        }
        //this.getLunches()

        this.state.filteredLunches = this.state.lunches
    }

    setFilterValue(filterValue) {
        this.state.currentMonth = new Date().getMonth()
        this.state.startWeek = moment().startOf('day').subtract(1, 'week')._d
        this.state.endWeek = new Date()

        this.state.filterValue = filterValue

        this.filterLunches()
        this.forceUpdate()
    }

    getLunches() {
        const url = 'https://lunchtag-resource-server.herokuapp.com/lunches'
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
                console.log(Auth.parseJwt(window.sessionStorage.getItem("token")))
                console.log(data)
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
        if (this.state.filterValue == 'month') {
            this.state.filteredLunches = this.state.lunches.filter((item) => {
                return item.date.getMonth() == this.state.currentMonth
            })
            this.forceUpdate()
            return
        }

        var beginWeek = moment().startOf('week').add(1, 'day').subtract(this.state.currentWeek, 'week')._d;
        var endWeek = moment().startOf('week').subtract(this.state.currentWeek - 1, 'week')._d;
        console.log(beginWeek)
        console.log(endWeek)

        if (this.state.filterValue == 'week') {
            this.state.filteredLunches = this.state.lunches.filter((item) => {
                return item.date >= beginWeek &&
                    item.date <= endWeek
            })
            this.forceUpdate()
        }
    }


    render() {
        const { filteredLunches } = this.state;
        return (
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


                        {this.state.filterValue == 'week' ?
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
                                    <LunchItem key={item.lunchID} lunch={item} />
                                ))}
                            </tbody>
                        </Table>
                    </Container>
                </div>
                <div className="sticky">
                        <Row >
                            <Col><Button variant="primary" size="lg" block>Lunch toevoegen</Button></Col>
                            <Col><Button variant="primary" size="lg" block>Exporteren</Button></Col>
                        </Row>
                        </div>
            </React.Fragment >
        )

    }

}

export default LunchOverview