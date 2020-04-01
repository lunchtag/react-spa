import React from 'react'

import Button from 'react-bootstrap/Button'

function LunchItem(...props) {

    const lunchItem = props.lunch;

    function deleteLunch(event){
        event.preventDefault();
        fetch('api/delete', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                lunchId: lunchItem.lunchID
            })
        }).then(
            window.alert("De lunch is succesvol verwijderd!")
        )
    }


    return (
        <tr>
            <td align="right">{lunchItem.username}</td>
            <td align="right">{lunchItem.date}</td>
            <td align="right">
                <Button onClick={deleteLunch} variant="primary">X</Button>
            </td>
        </tr>
    )
}

export default LunchItem