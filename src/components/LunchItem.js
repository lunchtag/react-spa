import React from 'react'

import Button from 'react-bootstrap/Button'

import Auth from '../service/auth'

function LunchItem(...props) {

    const lunchItem = props[0].lunch;

    function deleteLunch(event) {
        event.preventDefault();
        const url = 'localhost:3000/accounts/' + Auth.parseJwt(window.sessionStorage.getItem("token").sub) + '/lunches/' + props.key
        fetch(url,  {
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
            <td align="right">{lunchItem.name}</td>
            <td align="right">{lunchItem.date.toString()}</td>
            <td align="right">
                <Button onClick={deleteLunch} variant="danger" block>X</Button>
            </td>
        </tr>
    )
}

export default LunchItem