import React, { Component } from 'react';

import dateHelper from '../service/dateHelper'
import Navbar from '../components/navbar/navbar'
import '../css/EmployeeDetails.css'

import EmployeeLunchItem from '../components/EmployeeLunchItem';

import { Container, Button, Typography, Paper, Table, TableHead, TableRow, TableCell, TableBody, Fab, ButtonGroup, TableContainer, FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import { Alert } from '@material-ui/lab'
import { Person, Today, ArrowBack, ArrowForward, OpenInBrowser } from '@material-ui/icons'

import { getAllUsers } from '../service/userService';
import { getAllLunchesFromUser } from '../service/lunchService';
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
    input:{
		minWidth: '50%',
		paddingBottom: '1%'
    },
    info:{
        marginBottom: '1%'
    }
});


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
        getAllUsers().then((res) => {
            this.setState({ users: res.data, selectedUser: res.data[0] })
            this.getLunchesFromUser()
        })
    }

    getLunchesFromUser() {
        getAllLunchesFromUser(this.state.selectedUser).then((data) => {
            if (data === "empty") {
                this.setState({ lunches: [], filteredLunches: [] })
            }
            else {
                this.setState({ lunches: data }, () => this.filterLunches())
            }
        })
    }

    filterLunches() {
        this.setState({
            filteredLunches: this.state.lunches.filter((item) => {
                return new Date(item.date).getMonth() === this.state.currentMonth
            })
        })
    }

    handleCurrentUserChange = (event) => {
        this.setState({ selectedUser: event.target.value }, () => {
            this.getLunchesFromUser()
        })
    }


    render() {
        const { classes } = this.props;

        const { filteredLunches, lunches, currentMonth, users, selectedUser } = this.state;

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
                        <div className="content">
                            <Container maxWidth="md">
                                <Typography variant="h2" component="h1" gutterBottom>Medewerker details</Typography>

                                <FormControl className={classes.input} variant="outlined" >
                                    <InputLabel>Medewerker</InputLabel>
                                    <Select 
                                    value={selectedUser.name}
                                    onChange={this.handleCurrentUserChange}>
                                        {users.map((user) => {
                                            return (
                                                <MenuItem value={user}  key={user.id}>{user.name + " " + user.lastName}</MenuItem>
                                            );
                                        })}
                                    </Select>
                                </FormControl>

                                {/* <Row><Col>
                                    <Dropdown>
                                        <Dropdown.Toggle variant="success" id="dropdown-basic" block>Selecteer een gebruiker</Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            {users.map((user) => (
                                                <Dropdown.Item key={user.id} onClick={() => this.handleCurrentUserChange(user)}>{user.name + " " + user.lastName}</Dropdown.Item>
                                            ))}
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Col></Row> */}

                                <Paper className={classes.info} elevation={3}><Typography  variant="h5">Totaal {lunches.length}x meegegeten</Typography></Paper>
                                <Paper className={classes.info} elevation={3}><Typography variant="h5">Rol: {selectedUser.role}</Typography></Paper>

                                {/* <Row>
                                    <Col><Alert variant="primary">{selectedUser.name + " " + selectedUser.lastName}</Alert></Col>
                                    <Col><Alert variant="primary">Totaal {lunches.length}x meegegeten</Alert></Col>
                                    <Col><Alert variant="primary">Rol: {selectedUser.role}</Alert></Col>
                                </Row> */}

                                <ButtonGroup className={classes.buttonGroup} fullWidth color="primary" aria-label="outlined primary button group">
                                    <Button onClick={() => { filterByPrevious() }}><ArrowBack /></Button>
                                    <Button onClick={() => { filterByCurrent() }}>Vandaag</Button>
                                    <Button onClick={() => { filterByNext() }}><ArrowForward /></Button>
                                </ButtonGroup>

                                {/* <Row>
                                    <Col><Button size="sm" onClick={() => { filterByPrevious() }} variant="outline-primary" block><ArrowLeft></ArrowLeft></Button></Col>
                                    <Col><Button size="sm" onClick={() => { filterByCurrent() }} variant="outline-primary" block>Vandaag</Button></Col>
                                    <Col><Button size="sm" onClick={() => { filterByNext() }} variant="outline-primary" block><ArrowRight></ArrowRight></Button></Col>
                                </Row> */}

                                <Paper elevation={3}>
                                    <Table className={classes.table}>
                                        <TableHead>
                                            <TableRow>
                                                <StyledTableCell align="left"><Today /></StyledTableCell>
                                                <StyledTableCell align="right"></StyledTableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {filteredLunches.map((item) => (
                                                <EmployeeLunchItem callback={() => deleteLunch(item.id)} key={item.id} lunch={item} />
                                            ))}
                                        </TableBody>
                                    </Table>
                                </Paper>

                                {/* <Table variant="dark" striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th><Calendar></Calendar> ({dateHelper.getMonthFromNumber(this.state.currentMonth)})</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredLunches.map((item) => (
                                            <EmployeeLunchItem callback={() => deleteLunch(item.id)} key={item.id} lunch={item} />
                                        ))}
                                    </tbody>
                                </Table> */}

                                {filteredLunches.length === 0 &&
                                    <Alert variant="outlined" severity="info">Er zijn geen lunches deze maand</Alert>
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


export default withStyles(useStyles)(EmployeeDetails)