import React from 'react'



import {TableRow, TableCell, IconButton, Typography} from '@material-ui/core'
import {DeleteRounded} from '@material-ui/icons'

function LunchItem(props) {
    const lunchItem = props.lunch;

    function deleteLunch(event) {
        const url = 'https://lunchtag-resource-server.herokuapp.com/lunch/' + lunchItem.id
        fetch(url, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + window.sessionStorage.getItem("token")
            }
        }).then(res => {
            props.callback()
        })
    }

    return (

        <TableRow>
            <TableCell align="left"><Typography variant="h6" gutterBottom>{lunchItem.account.name + " " + lunchItem.account.lastName}</Typography></TableCell>
            <TableCell align="center"><Typography variant="h6" gutterBottom>{new Date(lunchItem.date).toDateString()}</Typography></TableCell>
            <TableCell align="right">
                <IconButton onClick={deleteLunch}><DeleteRounded color="error" ></DeleteRounded></IconButton>
            </TableCell>
        </TableRow>
    )
}

export default LunchItem