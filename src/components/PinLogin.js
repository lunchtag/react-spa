import React, { useState, useEffect } from "react";
import "../css/PinLogin.css"
import Popup from "reactjs-popup";
import NumericKeyPad from "./NumericKeyPad";

function PinLogin() {

    const [users, setUsers] = useState([
        {
            email: "test@test.nl",
            name: "Olaf de lange",
            id: "1"
        },
        {
            email: "test@test.nl",
            name: "Olivier Janssen",
            id: "2"
        },
        {
            email: "test@test.nl",
            name: "Olivia Pietersen",
            id: "3"
        },
        {
            email: "test@test.nl",
            name: "Odin van der Linden",
            id: ""
        }]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [pin, setPin] = useState("");
    let firstRow = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"];
    let secondRow = ["a", "s", "d", "f", "g", "h", "j", "k", "l",];
    let thirdRow = ["z", "x", "c", "v", "b", "n", "m"];

    function filterUsers(letter) {
        console.log(letter)
        let filterUsersArray = users.filter(checkFirstLetter.bind(this, letter))
        setFilteredUsers(filterUsersArray)
    }

    function checkFirstLetter(letter, element) {
        return element.name.charAt(0).toLowerCase() === letter
    }

    let filteredUsersDiv = (
        <div className="users noUsersFiltered"><p>Select a letter to search your name!</p></div>
    )

    const appendToPin = (value) =>{
        setPin(pin.concat(value))
    }

    const removeFromPin = () =>{
        setPin(pin.substring(0, pin.length - 1))
    }

    if (filteredUsers.length > 0) {
        filteredUsersDiv = (
            <div className="users">
                {filteredUsers.map(value => {
                    return (
                        <div className="selectUserBtn">
                            <Popup trigger={<button>{value.name}</button>} key={value.id} modal>
                                <h2>{value.name}</h2>
                                <p className="pin">{pin}</p>
                                <div className="numericKeyPadHolder">
                                    <NumericKeyPad addToPin={appendToPin} removePin={removeFromPin}/>
                                </div>
                            </Popup>
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
        </div>
    )
}

export default PinLogin