import React, { Component } from 'react';

import 'react-moment'
import dateHelper from '../service/dateHelper'
import Navbar from '../components/navbar/navbar'

import LunchItem from '../components/LunchItem'

import { Container, Button, Typography, Paper, Table, TableHead, TableRow, TableCell, TableBody, Chip, Fab, Tab, Tabs, ButtonGroup,  TableContainer } from "@material-ui/core";
import { Person, Today, ArrowBack, ArrowForward, OpenInBrowser } from '@material-ui/icons'

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
            console.log(data.data);
            if (data.data !== "No Lunches were found") {
                this.setState({
                    lunches: data.data,
                    filteredLunches: data.data,
                });
                this.filterLunches();
            }
        });
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
            this.setState({ lunches: newLunches, filteredLunches: newLunches })
            this.filterLunches()
        }


        return (
            <div className="flexboxes">
                <Navbar />
                <div className="rightpanel">
                    <React.Fragment>
                        <div>
                            <Container maxWidth="lg">
                                <Typography variant="h2" component="h1" gutterBottom>Overzicht lunch</Typography>
                                {this.state.filterValue === 'month' ?
                                    <Typography variant="h4" component="h1" gutterBottom>Huidige maand: {dateHelper.getMonthFromNumber(this.state.currentMonth)}</Typography>:                                       
                                    <Typography variant="h4" component="h1" gutterBottom>Huidig week: {this.state.currentWeekNr}</Typography>}


                                <Paper >
                                    <Tabs
                                        indicatorColor="primary"
                                        textColor="primary"
                                        // onChange={handleChange}
                                        variant="fullWidth"
                                        aria-label="disabled tabs example"
                                    >
                                        <Tab onClick={() => { setFilterValue('week') }} label="Week" />
                                        <Tab onClick={() => { setFilterValue('month') }} label="Maand" />
                                    </Tabs>
                                </Paper>
                                {/* {this.state.filterValue === 'week' ?
                                    <Row>
                                        <Col><Button onClick={() => { setFilterValue('week') }} variant="success" size="sm" block>Week</Button></Col>
                                        <Col><Button onClick={() => { setFilterValue('month') }} variant="info" size="sm" block>Maand</Button></Col>
                                    </Row>
                                    :
                                    <Row>
                                        <Col><Button onClick={() => { setFilterValue('week') }} variant="info" size="sm" block>Week</Button></Col>
                                        <Col><Button onClick={() => { setFilterValue('month') }} variant="success" size="sm" block>Maand</Button></Col>
                                    </Row>
                                } */}

                                <ButtonGroup fullWidth color="primary" aria-label="outlined primary button group">
                                    <Button onClick={() => { filterByPrevious() }}><ArrowBack/></Button>
                                    <Button onClick={() => { filterByCurrent() }}>Vandaag</Button>
                                    <Button onClick={() => { filterByNext() }}><ArrowForward/></Button>
                                </ButtonGroup>

                                {/* <Row>
                                    <Col><Button onClick={() => { filterByPrevious() }} variant="outline-primary" size="sm" block><ArrowLeft></ArrowLeft></Button></Col>
                                    <Col><Button onClick={() => { filterByCurrent() }} variant="outline-primary" size="sm" block>Vandaag</Button></Col>
                                    <Col><Button onClick={() => { filterByNext() }} variant="outline-primary" size="sm" block><ArrowRight></ArrowRight></Button></Col>
                                </Row> */}

                                <TableContainer component={Paper}>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell><Person/></TableCell>
                                                <TableCell><Today/></TableCell>
                                                <TableCell></TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {filteredLunches.map((item) => (
                                                <LunchItem callback={() => deleteLunch(item.id)} key={item.id} lunch={item} />
                                            ))
                                            }
                                        </TableBody>
                                    </Table>
                                </TableContainer>



                                {/* <Table size="sm" variant="dark" striped bordered>
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
                                        ))
                                        }

                                    </tbody>
                                </Table> */}
                                {filteredLunches[0] === null && filterValue === "month" &&
                                    <Chip color="secondary" label="Er zijn geen lunches deze maand" />}

                                {filteredLunches[0] === null && filterValue === "week" &&
                                    <Chip color="secondary" label="Er zijn geen lunches deze week" />
                                }
                                <Fab color="primary"><OpenInBrowser/></Fab>
                            </Container>
                        </div>

                    </React.Fragment >
                </div>
            </div>
        )
    }

}

export default LunchOverview