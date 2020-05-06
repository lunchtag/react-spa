import React, { useState } from "react";
import "../css/PinLogin.css"
import Popup from "reactjs-popup";
import NumericKeyPad from "./NumericKeyPad";
import { pinLoginCall } from "../service/userService";
import auth from "../service/auth";

function PinLogin(props) {

    const [filteredUsers, setFilteredUsers] = useState([]);
    const [pin, setPin] = useState("");
    const [currentUser, setCurrentUser] = useState({});
    const [showPopup, setShowPopup] = useState(false);
    const [wrongCredentials, setwrongCredentials] = useState(false)
    let firstRow = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"];
    let secondRow = ["a", "s", "d", "f", "g", "h", "j", "k", "l",];
    let thirdRow = ["z", "x", "c", "v", "b", "n", "m"];

    function filterUsers(letter) {
        let filterUsersArray = props.users.filter(checkFirstLetter.bind(this, letter))
        setFilteredUsers(filterUsersArray)
    }

    function checkFirstLetter(letter, element) {
        return element.name.charAt(0).toLowerCase() === letter
    }

    let filteredUsersDiv = (
        <div className="users noUsersFiltered"><p>Select a letter to search your name!</p></div>
    )

    const appendToPin = (value) => {
        if (pin.length + 1 === 5) {
            let confirmedPin = pin.concat(value)
            setPin(pin.concat(value))
            pinLoginCall(confirmedPin, currentUser.email).then(res => {
                if (res.status === 200) {
                    if (res.data.token != null) {
                        auth.login(res.data);
                        debugger
                        props.history.push("/dashboard");
                    }
                }else{
                    setwrongCredentials(true)
                }
            })
        } else if (pin.length <= 4) {
            setPin(pin.concat(value))
        }
    }

    const removeFromPin = () => {
        setPin(pin.substring(0, pin.length - 1))
    }

    const popup = (value) => {
        setCurrentUser(value)
        setShowPopup(true)
    }

    const closePopup = () =>{
        setShowPopup(false)
        setPin("")
        setwrongCredentials(false)
    }

    if (filteredUsers.length > 0) {
        filteredUsersDiv = (
            <div className="users">
                {filteredUsers.map(value => {
                    return (
                        <div className="selectUserBtn" key={value.id}>
                            <button onClick={() => popup(value)}>{`${value.name} ${value.lastName}`}</button>
                        </div>)
                })}
            </div>
        )
    }
    return (
        <div className="pinLogin">
            {filteredUsersDiv}
            <div className="alphabet">
                <div className="firstRow">
                    {firstRow.map(value => {
                        return (
                            <button key={value} className="letterBtn" onClick={() => filterUsers(value)}>{value}</button>
                        )
                    })}
                </div>
                <div className="secondRow">
                    {secondRow.map(value => {
                        return (
                            <button key={value} className="letterBtn" onClick={() => filterUsers(value)}>{value}</button>
                        )
                    })}
                </div>
                <div className="thirdRow">
                    {thirdRow.map(value => {
                        return (
                            <button key={value} className="letterBtn" onClick={() => filterUsers(value)}>{value}</button>
                        )
                    })}
                </div>
            </div>
            <Popup modal open={showPopup} onClose={closePopup}>
                <div className="popup">
                    <h2>{currentUser.name + currentUser.lastName}</h2>
                    <p className="pin">{pin}</p>
                    <div hidden={!wrongCredentials} className="error">Wrong pin!</div>
                    <div className="numericKeyPadHolder">
                        <NumericKeyPad addToPin={appendToPin} removePin={removeFromPin} />
                    </div>
                </div>
            </Popup>
        </div>
    )
}

export default PinLogin