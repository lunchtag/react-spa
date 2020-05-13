import React, { useState } from "react";
import "../css/PinLogin.css"
import Popup from "reactjs-popup";
import NumericKeyPad from "./NumericKeyPad";
import { pinLoginCall } from "../service/userService";
import auth from "../service/auth";


import { Container, Grid, Button, Typography, TextField, FormControl, InputAdornment, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { AlternateEmail, Save } from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        textAlign: 'center',
        color: theme.palette.text.primary,
        backgroundColor: '#f2f2f2',
        height: 100,
        width: 100,
        fontSize: 60
    },

}));

function PinLogin(props) {
    const classes = useStyles();

    const [filteredUsers, setFilteredUsers] = useState([]);
    const [pin, setPin] = useState("");
    const [currentUser, setCurrentUser] = useState({});
    const [showPopup, setShowPopup] = useState(false);
    const [wrongCredentials, setwrongCredentials] = useState(false)
    let firstRow = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"];
    let secondRow = ["a", "s", "d", "f", "g", "h", "j", "k", "l",];
    let thirdRow = ["z", "x", "c", "v", "b", "n", "m"];

    function filterUsers(letter) {
        let filterUsersArray = props.users.filter(checkFirstLetter.bind(this, letter))
        setFilteredUsers(filterUsersArray)
    }

    function checkFirstLetter(letter, element) {
        return element.name.charAt(0).toLowerCase() === letter
    }

    let filteredUsersDiv = (
        <Typography variant="h2" component="h1" gutterBottom>Selecteer de eerste letter van uw naam</Typography>
    )

    const appendToPin = (value) => {
        if (pin.length + 1 === 5) {
            let confirmedPin = pin.concat(value)
            setPin(pin.concat(value))
            pinLoginCall(confirmedPin, currentUser.email).then(res => {
                if (res.status === 200) {
                    if (res.data.token != null) {
                        auth.login(res.data);
                        debugger
                        props.history.push("/dashboard");
                    }
                } else {
                    setwrongCredentials(true)
                }
            })
        } else if (pin.length <= 4) {
            setPin(pin.concat(value))
        }
    }

    const removeFromPin = () => {
        setPin(pin.substring(0, pin.length - 1))
    }

    const popup = (value) => {
        setCurrentUser(value)
        setShowPopup(true)
    }

    const closePopup = () => {
        setShowPopup(false)
        setPin("")
        setwrongCredentials(false)
    }

    if (filteredUsers.length > 0) {
        filteredUsersDiv = (
            <div className="users">
                {filteredUsers.map(value => {
                    return (
                        <div className="selectUserBtn" key={value.id}>
                            <button onClick={() => popup(value)}>{`${value.name} ${value.lastName}`}</button>
                        </div>)
                })}
            </div>
        )
    }
    return (
        <div className="pinLogin">
            {filteredUsersDiv}
            <Grid className={classes.root} container spacing={3}>
                    <Grid item xs={12} container justify="center" spacing={3}>
                        {firstRow.map(value => {
                            return (
                                <Grid item>
                                    <Paper key={value} className={classes.paper} onClick={() => filterUsers(value)}>{value}</Paper>
                                </Grid>
                            )
                        })}
                    </Grid>
                    <Grid item xs={12} container justify="center" spacing={3}>
                        {secondRow.map(value => {
                            return (
                                <Grid item>
                                    <Paper key={value} className={classes.paper} onClick={() => filterUsers(value)}>{value}</Paper>
                                </Grid>
                            )
                        })}
                    </Grid>
                    <Grid item xs={12} container justify="center" spacing={3}>
                        {thirdRow.map(value => {
                            return (
                                <Grid item>
                                    <Paper key={value} className={classes.paper} onClick={() => filterUsers(value)}>{value}</Paper>
                                </Grid>
                            )
                        })}
                    </Grid>
            </Grid>
            <Popup modal open={showPopup} onClose={closePopup}>
                <div className="popup">
                    <h2>{currentUser.name + currentUser.lastName}</h2>
                    <p className="pin">{pin}</p>
                    <div hidden={!wrongCredentials} className="error">Wrong pin!</div>
                    <div className="numericKeyPadHolder">
                        <NumericKeyPad addToPin={appendToPin} removePin={removeFromPin} />
                    </div>
                </div>
            </Popup>
        </div>
    )
}

export default PinLogin