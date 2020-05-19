import React, { useState, useEffect } from 'react';
import Navbar from "../components/navbar/navbar";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import { getAllUsers, updateUser, disableById } from '../service/UserOverviewService';
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
        props.history.push('/employee');
    }

    function handleDisable(id, isNonLocked) {
        if (!isNonLocked) {
            alert("Gebruiker is inactief");
        } else {
            disableById(id).then(res => {
                if (res.status === 200) {
                    getAllUsers().then((res) => {
                        setUsers(res.data);
                        window.location.reload();
                    })
                }
                // console.log(res);
            })
        }

    }

    function handleUpdate() {
        users.map((item) => (
            updateUser(item)
        ))
    }

    function handleAddPerson() {
        props.history.push('/seccreateuser');
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
                    case "role":
                        item.role = value;
                        break;
                }
            }
        })
        console.log(users);
    }

    return (
        <div className="flexboxes">
                <Navbar />
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
                                <td><Form.Control disabled={!item.isNonLocked} name="name" type="name" defaultValue={item.name} onChange={e => handleOnchange(item, e)} /></td>
                                <td><Form.Control disabled={!item.isNonLocked} name="lastName" type="lastName" defaultValue={item.lastName} onChange={e => handleOnchange(item, e)} /></td>
                                <td>{item.email}</td>
                                <td>{item.role}</td>
                                <td><Button disabled={!item.isNonLocked} variant="primary" onClick={() => handleDetails(item.id)}>Details</Button><Trash color="red" style={{ cursor: 'pointer' }} size={24} onClick={() => handleDisable(item.id, item.isNonLocked)} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <div className="btn-submit">
                    <Button variant="success" onClick={handleUpdate}>Wijzigingen opslaan</Button>
                    <Button variant="primary" onClick={handleAddPerson}>Personeel toevoegen</Button>
                </div>

            </div>
        </div >
    )
}


export default UserOverView;