import React, { Component } from 'react';
import Table from 'react-bootstrap/Table'

import LunchItem from '../components/LunchItem'
import { Row, Container, Col, Button } from 'react-bootstrap';

import '../css/LunchOverview.css'


class LunchOverview extends Component {

    constructor(props) {
        super(props)

        this.state = {
            lunches: []
        }

        this.getLunches()
    }

    getLunches() {
        const url = 'http://localhost:7575/accounts/' + window.sessionStorage.getItem("userId") + '/lunches'
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
            })
    }


    render() {
        const { userId, lunches } = this.state;

        return (
            <React.Fragment>
                <div>

                    <Row>
                        <Col><Button variant="outline-primary" size="lg" block>Vorige</Button></Col>
                        <Col><Button variant="outline-primary" size="lg" block>Huidige</Button></Col>
                        <Col><Button variant="outline-primary" size="lg" block>Volgende</Button></Col>
                    </Row>
                    <Container>
                        <Row >
                            <Col><h1>Overzicht lunch</h1></Col>
                        </Row>
                        <Row>
                            <Col><Button variant="info" size="sm" block>Week</Button></Col>
                            <Col><Button variant="info" size="sm" block>Maand</Button></Col>
                        </Row>
                    </Container>

                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Naam</th>
                                <th>Datum</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {lunches.map((item) => (
                                <LunchItem key={item.id} lunch={item} />
                            ))}
                        </tbody>
                    </Table>

                    <Container>
                        <Row>
                            <Col><Button variant="primary" size="lg" block>Lunch toevoegen</Button></Col>
                            <Col><Button variant="primary" size="lg" block>Exporteren</Button></Col>
                        </Row>
                    </Container>



                </div>

            </React.Fragment >
        )

    }

}

export default LunchOverview