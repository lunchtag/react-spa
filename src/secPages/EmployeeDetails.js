import React, { Component } from 'react';

import Navbar from '../components/navbar/navbar'
import '../css/EmployeeDetails.css'

import EmployeeLunchItem from '../components/EmployeeLunchItem';

import { Container, Button, Typography, Paper, Table, TableHead, TableRow, TableCell, TableBody, Fab, ButtonGroup, FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import { Alert } from '@material-ui/lab'
import { Today, ArrowBack, ArrowForward, OpenInBrowser } from '@material-ui/icons'
import { getAllLunchesFromUser, exportPdf } from '../service/lunchService';
import { getAllUsers } from '../service/userService';

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
            currentMonth: new Date().getMonth(),
            currentYear: new Date().getFullYear()
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
                return new Date(item.date).getMonth() === this.state.currentMonth && new Date(item.date).getFullYear() === this.state.currentYear
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
        const { filteredLunches, currentMonth, currentYear, users, selectedUser } = this.state;


        const filterByCurrent = () => {
            this.setState({
                currentMonth: new Date().getMonth(),
                currentYear: new Date().getFullYear()
            }, () => {
                this.filterLunches();
            })
        }
        const handleExport = () => {
            exportPdf(currentYear, currentMonth).then(res => {
                if (res.status === 200) {
                    const url = window.URL.createObjectURL(new Blob([res.data]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', `Maandoverzicht-${currentYear}-${currentMonth}.pdf`); //or any other extension
                    document.body.appendChild(link);
                    link.click();
                }
            })
            console.log(currentMonth);
        }
        const filterByNext = () => {
            if (this.state.currentMonth < 11) {
                this.setState({ currentMonth: currentMonth + 1 }, () => {
                    this.filterLunches();
                })
            } else {
                this.setState({ currentMonth: currentMonth - 11, currentYear: currentYear + 1 }, () => {
                    this.filterLunches();
                })
            }
        }


        const filterByPrevious = () => {
            if (this.state.currentMonth > 0) {
                this.setState({ currentMonth: currentMonth - 1 }, () => {
                    this.filterLunches();
                })
            } else {
                this.setState({ currentMonth: currentMonth + 11, currentYear: currentYear - 1 }, () => {
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

                                <Paper className={classes.info} elevation={3}><Typography  variant="h5">Deze maand {filteredLunches.length}x meegegeten</Typography></Paper>
                                <Paper className={classes.info} elevation={3}><Typography variant="h5">Rol: {selectedUser.role}</Typography></Paper>

                                <ButtonGroup className={classes.buttonGroup} fullWidth color="primary" aria-label="outlined primary button group">
                                    <Button onClick={() => { filterByPrevious() }}><ArrowBack /></Button>
                                    <Button onClick={() => { filterByCurrent() }}>Vandaag</Button>
                                    <Button onClick={() => { filterByNext() }}><ArrowForward /></Button>
                                </ButtonGroup>

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

                                {filteredLunches.length === 0 &&
                                    <Alert variant="outlined" severity="info">Er zijn geen lunches deze maand</Alert>
                                }
                                <Fab color="primary" size="large" onClick={() => handleExport()} className={classes.export}><OpenInBrowser /></Fab>
                            </Container>
                        </div>
                    </React.Fragment >
                </div>
            </div>
        )
    }
}


export default withStyles(useStyles)(EmployeeDetails)