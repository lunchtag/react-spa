import React, { Component } from 'react';

import 'react-moment'
import dateHelper from '../service/dateHelper'
import Navbar from '../components/navbar/navbar'

import LunchItem from '../components/LunchItem'

import { Container, Button, Typography, Paper, Table, TableHead, TableRow, TableCell, TableBody, Chip, Fab, Tab, Tabs, ButtonGroup, TableContainer } from "@material-ui/core";
import { Alert } from '@material-ui/lab'
import { Person, Today, ArrowBack, ArrowForward, OpenInBrowser } from '@material-ui/icons'

import { getAllLunchesForUser } from '../service/lunchService'

import '../css/LunchOverview.css'
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';

const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);

const useStyles = theme => ({
    export: {
        position: 'absolute',
        bottom: theme.spacing(3),
        right: theme.spacing(3),
    },
    buttonGroup: {
        paddingBottom: '1%'
    },
    table:{

    }
});



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
            console.log(this.state.filterValue)
            console.log(this.state.filteredLunches)

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
        const { classes } = this.props;

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
                                    <Typography variant="h4" component="h1" gutterBottom>Huidige maand: {dateHelper.getMonthFromNumber(this.state.currentMonth)}</Typography> :
                                    <Typography variant="h4" component="h1" gutterBottom>Huidig week: {this.state.currentWeekNr}</Typography>}

                                <ButtonGroup className={classes.buttonGroup} fullWidth>
                                    {this.state.filterValue === 'week' ?
                                        <><Button fullWidth variant="contained" color="secondary" value="week" onClick={() => { setFilterValue('week') }}>Week</Button>
                                            <Button fullWidth variant="contained" value="month" onClick={() => { setFilterValue('month') }}>Maand</Button></> :
                                        <><Button fullWidth variant="contained" value="week" onClick={() => { setFilterValue('week') }}>Week</Button>
                                            <Button fullWidth variant="contained" color="secondary" value="month" onClick={() => { setFilterValue('month') }}>Maand</Button></>
                                    }

                                </ButtonGroup>

                                <ButtonGroup className={classes.buttonGroup} fullWidth color="primary" aria-label="outlined primary button group">
                                    <Button onClick={() => { filterByPrevious() }}><ArrowBack /></Button>
                                    <Button onClick={() => { filterByCurrent() }}>Vandaag</Button>
                                    <Button onClick={() => { filterByNext() }}><ArrowForward /></Button>
                                </ButtonGroup>

                                <Paper elevation={3}>
                                    <Table className={classes.table}>
                                        <TableHead>
                                            <TableRow>
                                                <StyledTableCell align="left"><Person /></StyledTableCell>
                                                <StyledTableCell align="center"><Today /></StyledTableCell>
                                                <StyledTableCell align="right"></StyledTableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {filteredLunches.map((item) => (
                                                <LunchItem callback={() => deleteLunch(item.id)} key={item.id} lunch={item} />
                                            ))
                                            }
                                        </TableBody>
                                    </Table>
                                </Paper>


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
                                {(filteredLunches.length === 0 && filterValue === "month") &&
                                <Alert variant="outlined" severity="info">Er zijn geen lunches deze maand</Alert>
                                    }
                                {filteredLunches.length === 0 && filterValue === "week" &&
                                <Alert variant="outlined" severity="info">Er zijn geen lunches deze week</Alert>
                                }
                                <Fab color="primary" size="large" className={classes.export}><OpenInBrowser /></Fab>
                            </Container>
                        </div>
                    </React.Fragment >
                </div>
            </div>
        )
    }

}

export default withStyles(useStyles)(LunchOverview)