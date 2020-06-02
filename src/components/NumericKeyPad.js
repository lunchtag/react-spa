import React from 'react'
import "../css/NumericKeyPad.css"

import { Grid, Paper, Container } from '@material-ui/core';
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
    )
}
