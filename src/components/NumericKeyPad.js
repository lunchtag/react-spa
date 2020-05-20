import React from 'react'
import "../css/NumericKeyPad.css"
import backspace from "../../src/backspace.svg"

import { Grid, Typography, Paper, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Backspace } from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        textAlign: 'center',
        color: theme.palette.text.primary,
        backgroundColor: '#f2f2f2',
        height: 75,
        width: 100,
        fontSize: 45
    },
}));

export default function NumericKeyPad(props) {
    const classes = useStyles();

    return (
        <Container maxWidth="xs">
        <Grid  className={classes.root} container spacing={1}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map(value => {
                return (
                    <Grid item sm={4}>
                        <Paper key={value} className={classes.paper} onClick={() => props.addToPin(value)}>{value}</Paper>
                    </Grid>
                )
            })}
            <Grid item sm={4}>
                <Paper className={classes.paper} onClick={props.removePin}><Backspace/></Paper>
            </Grid>
        </Grid>
        </Container>



            /* <Grid item xs={12} container justify="center" spacing={3}>
                    {[4,5,6].map(value => {
                        return (
                            <Grid item>
                                <Paper key={value} className={classes.paper} onClick={() => props.addToPin(value)}>{value}</Paper>
                            </Grid>
                        )
                    })}
                </Grid>
                <Grid item xs={12} container justify="center" spacing={3}>
                    {[7,8,9].map(value => {
                        return (
                            <Grid item>
                                                                <Paper key={value} className={classes.paper} onClick={() => props.addToPin(value)}>{value}</Paper>

                            </Grid>
                        )
                    })}
                </Grid> */
        // </Grid >




        // <div className="numericKeyPad">
        //     <button className="keyPadBtn" onClick={() => props.addToPin(1)}>1</button>
        //     <button className="keyPadBtn" onClick={() => props.addToPin(2)}>2</button>
        //     <button className="keyPadBtn" onClick={() => props.addToPin(3)}>3</button>
        //     <button className="keyPadBtn" onClick={() => props.addToPin(4)}>4</button>
        //     <button className="keyPadBtn" onClick={() => props.addToPin(5)}>5</button>
        //     <button className="keyPadBtn" onClick={() => props.addToPin(6)}>6</button>
        //     <button className="keyPadBtn" onClick={() => props.addToPin(7)}>7</button>
        //     <button className="keyPadBtn" onClick={() => props.addToPin(8)}>8</button>
        //     <button className="keyPadBtn" onClick={() => props.addToPin(9)}>9</button>
        //     <button className="keyPadBtn" onClick={() => props.addToPin(0)}>0</button>
        //     <div className="keyPadBtn backspace"><img src={backspace} alt="BackSpace" onClick={props.removePin}></img></div>
        // </div>
    )
}
