import React from 'react'

import Button from 'react-bootstrap/Button'

import Auth from '../service/auth'

function LunchItem(...props) {
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
            <td align="right">{lunchItem.account.name}</td>
            <td align="right">{Date(lunchItem.date)}</td>
            <td align="right">
                <Button onClick={deleteLunch} variant="danger" block>X</Button>
            </td>
        </tr>
    )
}

export default LunchItem