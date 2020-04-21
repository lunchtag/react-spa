import React, { Component } from 'react';
import Table from 'react-bootstrap/Table'

import 'react-moment'
import dateHelper from '../service/dateHelper'
import Navbar from '../components/navbar/navbar'

import LunchItem from '../components/LunchItem'
import { Row, Container, Col, Button, ButtonGroup, Alert } from 'react-bootstrap';

import '../css/LunchOverview.css'
import moment from 'moment';
import EmployeeLunchItem from '../components/EmployeeLunchItem';


class EmployeeDetails extends Component {

    constructor(props) {
        super(props)

        this.state = {
            user: '',

            lunches: [],
            filteredLunches: [],

            filterValue: 'month',
            currentMonth: new Date().getMonth()
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
        this.setState({
            filteredLunches: this.state.lunches.filter((item) => {
                return new Date(item.date).getMonth() === this.state.currentMonth
            })
        })
        return
    }


    render() {
        const { filteredLunches, currentMonth, } = this.state;


        const filterByCurrent = () => {
            this.setState({
                currentMonth: new Date().getMonth()
            }, () => {
                this.filterLunches();
            })
        }

        const filterByNext = () => {
            if (this.state.currentMonth < 11) {
                this.setState({ currentMonth: currentMonth + 1 }, () => {
                    this.filterLunches();
                })
            }
        }

        const filterByPrevious = () => {
            if (this.state.currentMonth > 0) {
                this.setState({ currentMonth: currentMonth - 1 }, () => {
                    this.filterLunches();
                })
            }
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
                                    <Col><h1>Medewerker details</h1></Col>
                                </Row>
                                <Row>
                                    <Col><Alert variant="primary">Naam + achternaam</Alert></Col>
                                    <Col></Col>
                                    <Col><Alert variant="primary">rol</Alert></Col>
                                </Row>
                                <Row><Col><Alert variant="info">Totaal aantal keer meegegeten:</Alert></Col></Row>
                                <Row>
                                    <Col><Button onClick={() => { filterByPrevious() }} variant="outline-primary" block>Vorige</Button></Col>
                                    <Col><Button onClick={() => { filterByCurrent() }} variant="outline-primary" block>Huidige</Button></Col>
                                    <Col><Button onClick={() => { filterByNext() }} variant="outline-primary" block>Volgende</Button></Col>
                                </Row>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>Datum ({dateHelper.getMonthFromNumber(this.state.currentMonth)})</th>
                                            <th>Verwijder</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredLunches.map((item) => (
                                            <EmployeeLunchItem key={item.id} lunch={item} />
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


export default EmployeeDetails