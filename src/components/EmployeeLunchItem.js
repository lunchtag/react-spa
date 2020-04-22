import React from 'react'


import { Col, Button } from 'react-bootstrap'
import { Trash } from 'react-bootstrap-icons'


function EmployeeLunchItem(...props) {
    const lunchItem = props[0].lunch;

    function deleteLunch(event) {
        const url = 'https://lunchtag-resource-server.herokuapp.com/lunch/' + lunchItem.id
        fetch(url, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + window.sessionStorage.getItem("token")
            }
        }).then(
            window.alert("De lunch is succesvol verwijderd!")
        )
    }

    return (
        <tr>
            <td align="middle">{new Date(lunchItem.date).toDateString()}</td>
            <td align="middle">
                <Button onClick={deleteLunch} variant="danger"><Trash></Trash></Button>
            </td>
        </tr>
    )
}

export default EmployeeLunchItem