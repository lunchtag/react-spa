import React, { Component } from 'react';

import dateHelper from '../service/dateHelper'
import Navbar from '../components/navbar/navbar'
import '../css/EmployeeDetails.css'

import { Row, Container, Col, Button, Alert, Dropdown, Table, ButtonGroup } from 'react-bootstrap';

import EmployeeLunchItem from '../components/EmployeeLunchItem';


class EmployeeDetails extends Component {

    constructor(props) {
        super(props)

        this.state = {
            selectedUser: '',
            users: [],

            lunches: [],
            filteredLunches: [],

            filterValue: 'month',
            currentMonth: new Date().getMonth()
        }
    }


    componentDidMount() {
        const url = 'https://lunchtag-resource-server.herokuapp.com/account/all'
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
                this.setState({ users: data, selectedUser: data[0] })
                this.getLunchesFromUser()
            })
    }

    getLunchesFromUser() {
        const url = 'https://lunchtag-resource-server.herokuapp.com/lunch/account/' + this.state.selectedUser.id
        console.log(this.state.selectedUser)
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
                console.log("data")
                console.log(data)
                this.setState({ lunches: data, filteredLunches: data })
            })
    }

    filterLunches() {
        this.setState({
            filteredLunches: this.state.lunches.filter((item) => {
                return new Date(item.date).getMonth() === this.state.currentMonth
            })
        })
    }

    handleCurrentUserChange(newCurrentUser) {
        this.setState({ selectedUser: newCurrentUser }, () => {
            this.getLunchesFromUser()
        })
    }


    render() {
        const { filteredLunches, currentMonth, users, selectedUser } = this.state;


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
                                <Row><Col>
                                    <Dropdown>
                                        <Dropdown.Toggle variant="success" id="dropdown-basic" block>Selecteer een gebruiker</Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            {users.map((user) => (
                                                <Dropdown.Item key={user.id} onClick={() => this.handleCurrentUserChange(user)}>{user.name + " " + user.lastName}</Dropdown.Item>
                                            ))}
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Col></Row>
                                <Row>
                                    <Col><Alert variant="primary">{selectedUser.name + " " + selectedUser.lastName}</Alert></Col>
                                    <Col></Col>
                                    <Col><Alert variant="primary">Rol: {selectedUser.role}</Alert></Col>
                                </Row>
                                <Row><Col><Alert variant="info">Totaal aantal keer meegegeten:</Alert></Col></Row>
                                <Row>
                                    <Col><Button onClick={() => { filterByPrevious() }} variant="outline-primary" block>←</Button></Col>
                                    <Col><Button onClick={() => { filterByCurrent() }} variant="outline-primary" block>•</Button></Col>
                                    <Col><Button onClick={() => { filterByNext() }} variant="outline-primary" block>→</Button></Col>
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
                                {filteredLunches[0] == null &&
                                    <Row><Col><Alert variant="warning">Er zijn geen lunches deze maand</Alert></Col></Row>}
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