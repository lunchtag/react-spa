import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Navbar from "../components/navbar/navbar";

import { getAllUsers, updateUser, disableById } from '../service/UserOverviewService';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import BlockIcon from '@material-ui/icons/Block';

import '../css/UserOverView.css';
import { getAllLunchesForUser } from '../service/lunchService';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const useStyles = makeStyles({
    tableContainer: {
        marginRight: "auto",
        marginLeft: "auto",
        width: "80%"
    },
    table: {
        minWidth: 650,
    },
    button: {
        marginRight: "15px"
    },
    submit: {
        marginTop: "50px",
        marginRight: "15px"
    }
});


function UserOverView(props) {
    const classes = useStyles();

    const [users, setUsers] = useState([]);
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    let result = [];
    // Snackbar
    const [open, setOpen] = React.useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    useEffect(() => {
        getAllUsers().then((res) => {
            setUsers(res.data);
            setIsLoading(false);
        })

    }, []);

    function handleDetails(id) {
        console.log("Handle details");
        // id meesturen naar andere pagina
        props.history.push('/employee');
    }

    function handleDisable(id, isNonLocked) {
        if (!isNonLocked) {
            alert("Gebruiker is inactief");
        } else {
            disableById(id).then(res => {
                if (res.status === 200) {
                    getAllUsers().then((res) => {
                        setUsers(res.data);
                        window.location.reload();
                    })
                }
                // console.log(res);
            })
        }

    }

    function handleUpdate() {
        users.map((item) => (
            updateUser(item)
        ))
        setOpen(true);
    }

    function handleAddPerson() {
        props.history.push('/seccreateuser');
    }
    // User is de hele user, e is de waarde van het veld
    function handleOnchange(user, e) {
        const value = e.target.value;
        const field = e.target.name;

        users.forEach(item => {
            if (item.id == user.id) {
                // item is het oude, user is de nieuwe
                switch (field) {
                    case "name":
                        item.name = value;
                        break;
                    case "lastName":
                        item.lastName = value;
                        break;
                    case "role":
                        item.role = value;
                        break;
                }
            }
        })
        // console.log(users);
    }

    // Filteren op actief account
    function checkIfNotLoading() {
        result = users.sort(function (a, b) {
            return b.isNonLocked - a.isNonLocked;
        })
    }
    return (

        < div className="flexboxes" >
            {!isLoading && checkIfNotLoading()
            }
            <Navbar />
            <div className="rightpanel">
                <h1>Overzicht medewerkers</h1>
                <p>Totaal aantal personen : {users.length} </p>
                <TableContainer className={classes.tableContainer} component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Naam</TableCell>
                                <TableCell>Achternaam</TableCell>
                                <TableCell align="right">Email</TableCell>
                                <TableCell align="right">Rol</TableCell>
                                <TableCell align="right"> </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((item) => (
                                <TableRow key={item.name}>
                                    <TableCell component="th" scope="row"><TextField id="standard-basic" label="voornaam" name="name" defaultValue={item.name} onChange={e => handleOnchange(item, e)} /></TableCell>
                                    <TableCell align="right"><TextField id="standard-basic" label="achternaam" name="lastName" defaultValue={item.lastName} onChange={e => handleOnchange(item, e)} /></TableCell>
                                    <TableCell align="right">{item.email}</TableCell>
                                    <TableCell align="right">{item.role}</TableCell>
                                    <TableCell align="right"><Button className={classes.button} color="primary" disabled={!item.isNonLocked} onClick={() => handleDetails(item.id)} variant="contained">Details</Button><BlockIcon color={!item.isNonLocked ? "disabled" : "secondary"} style={{ cursor: "pointer" }} onClick={() => handleDisable(item.id, item.isNonLocked)} /></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <div className="btn-submit">
                    <Button className={classes.submit} color="primary" variant="outlined" onClick={handleUpdate}>Wijzigingen opslaan</Button>
                    <Button className={classes.submit} color="secondary" variant="outlined" onClick={handleAddPerson}>Personeel toevoegen</Button>
                </div>
                <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                    <MuiAlert onClose={handleClose} severity="success">
                        Wijzigingen zijn opgeslagen!
                    </MuiAlert>
                </Snackbar>
            </div>
        </div >
    )
}


export default UserOverView;