import React from 'react'

import Button from 'react-bootstrap/Button'

function LunchItem(...props) {

    function deleteLunch(event){
        event.preventDefault();
        fetch('api/delete', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                lunchId: props[0].key
            })
        }).then(
            window.alert("De lunch is succesvol verwijderd!")
        )

    }


    return (
        <tr>
            <td align="right">{props[0].lunch.username}</td>
            <td align="right">{props[0].lunch.date}</td>
            <td align="right">
                <Button onClick={deleteLunch} variant="primary">X</Button>
            </td>
        </tr>
    )
}

export default LunchItem