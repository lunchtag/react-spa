import React, { useState, useEffect } from 'react';
import Navbar from "../components/navbar/navbar";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { getAllUsers, fetchData, getUserById, disableById } from '../service/UserOverviewService';
import { Trash } from 'react-bootstrap-icons';


import '../css/UserOverView.css';
import { getAllLunchesForUser } from '../service/lunchService';

function UserOverView(props) {
    const [users, setUsers] = useState([]);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        getAllUsers().then((res) => {
            setUsers(res.data);
        })
    }, []);


    function handleDetails(id) {
        console.log("Handle details");
        // id meesturen naar andere pagina
        props.history.push('users/' + id);
    }
    function handleDisable(id) {
        disableById(id)
        console.log("Handle disable");
    }

    // User is de hele user, e is de waarde van het veld
    function handleOnchange(user, e) {
        const value = e.target.value;
        const field = e.target.name;
        users.forEach(item => {
            if (item.id == user.id) {
                // item is het oude, user is de nieuwe
                switch (field) {
                    case "name":
                        item.name = value;
                        break;
                    case "lastName":
                        item.lastName = value;
                        break;
                    case "email":
                        item.email = value;
                        break;
                    case "role":
                        item.role = value;
                        break;
                }
            }
        })
        console.log(users);
    }

    function handleUpdate() {

    }

    return (
        <div className="flexboxes">
            <div className="leftpanel">
                <Navbar />
            </div>
            <div className="rightpanel">
                <h1>Overzicht medewerkers</h1>
                <p>Totaal aantal personen : {users.length} </p>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Naam</th>
                            <th>Achternaam</th>
                            <th>Email</th>
                            <th>Rol</th>
                            <th width="17%"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((item) => (
                            <tr>
                                <td><Form.Control name="name" type="name" defaultValue={item.name} onChange={e => handleOnchange(item, e)} /></td>
                                <td><Form.Control name="lastName" type="lastName" defaultValue={item.lastName} onChange={e => handleOnchange(item, e)} /></td>
                                <td><Form.Control name="email" type="email" defaultValue={item.email} /></td>
                                <td><Form.Control name="role" type="role" defaultValue={item.role} /></td>
                                <td><Button variant="primary" onClick={() => handleDetails(item.id)}>Details</Button><Trash color="red" style={{ cursor: 'pointer' }} size={24} onClick={handleDisable} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <div className="btn-submit">
                    <Button variant="success" onClick={handleUpdate}>Wijzigingen opslaan</Button>
                    <Button variant="primary">Personeel toevoegen</Button>
                </div>

            </div>
        </div >
    )
}


export default UserOverView;