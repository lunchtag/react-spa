import React from 'react'



import {TableRow, TableCell, IconButton} from '@material-ui/core'
import {Delete} from '@material-ui/icons'

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
            <TableCell>{lunchItem.account.name + " " + lunchItem.account.lastName}</TableCell>
            <TableCell>{new Date(lunchItem.date).toDateString()}</TableCell>
            <TableCell>
                <IconButton onClick={deleteLunch}><Delete color="error" ></Delete></IconButton>
                
                {/* <Button  variant="danger"><Trash></Trash></Button> */}
            </TableCell>
        </TableRow>
    )
}

export default LunchItem