import React, { useState, useEffect } from "react";
//import auth from "../service/auth";
import dateFormat from "dateformat";

import { Button } from "react-bootstrap";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import "../css/RegisterLunch.css";
import Navbar from "../components/navbar/navbar";
import { startOfDay } from "@fullcalendar/core";

function RegisterLunch() {
    let deleted;

    //const jwtData = auth.parseJwt(window.sessionStorage.getItem("token"));

    const [lunch, setLunch] = useState([
        {
            id: "",
            title: "Lunch",
            date: new Date("2020-04-10")
        }
    ])

    function getLunches() {
        const url = 'https://lunchtag-resource-server.herokuapp.com/lunch'
        fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + window.sessionStorage.getItem("token")
            }
        })
            .then(res => res.json())
            .then(data => {
                setLunch(data)
                console.log(lunch);

            })
    }

    function deleteLunchApi(lunchId) {
        console.log(lunchId);
        fetch('https://lunchtag-resource-server.herokuapp.com/lunch/' + lunchId, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + window.sessionStorage.getItem('token')
            }
        }).then(response => {
            if (response.status === 200) {
                window.alert("De lunch is succesvol verwijderd!");
            } else {
                window.alert("Er is iets fout gegaan.");
            }
            getLunches();
        })
    }

    function checkDelete(newLunch) {
        deleted = false;
        // Eerst even kijken of er gedeleted moet worden of niet
        lunch.forEach(l => {
            let dateJavascript = new Date(newLunch.date);
            let dateDB = new Date(l.date);

            if (
                dateJavascript.getFullYear() === dateDB.getFullYear() &&
                dateJavascript.getMonth() === dateDB.getMonth() &&
                dateJavascript.getDate() === dateDB.getDate()
            ) {
                // Alle lunches verwijderen met deze datum (dateDB)
                deleteLunchApi(l.id);
                deleted = true;
            }
        })
    }

    function addlunchApi(newLunch) {
        checkDelete(newLunch);
        if (!deleted) {
            fetch('https://lunchtag-resource-server.herokuapp.com/lunch', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + window.sessionStorage.getItem('token')
                },
                body: JSON.stringify({
                    name: newLunch.title,
                    date: newLunch.date
                })
            }).then(response => {
                if (response.status === 200) {
                    window.alert("De lunch is succesvol toegevoegd!");
                } else {
                    // console.log(data.message);
                    window.alert("Er is iets fout gegaan.");
                }
                getLunches();
            })

            setLunch(oldLunches => [...oldLunches, newLunch]); // Dit update de lunch array , Wanneer dit samen werkt met de api, kunnen we ook alle lunches ophalen en die in de array zetten

        }
    }


    function addToday() {
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();

        today = mm + '/' + dd + '/' + yyyy;

        const date = dateFormat(today, "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'");

        const newLunch = {
            title: "Lunch",
            date: date
        }
        addlunchApi(newLunch);
    }

    // Wanneer er op een datum wordt geklikt
    const handleDateClick = arg => {
        const currentDate = new Date();
        const date = dateFormat(arg.dateStr, "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'");
        const newLunch = {
            title: "Lunch",
            date: date
        }
        if (arg.date < currentDate) {
            addlunchApi(newLunch)
        }
    }

    useEffect(() => {
        getLunches();
    }, []);

    return (
        <div class="flexboxes">
            <div class="leftpanel">
                <Navbar />
            </div>
            <div class="rightpanel">
                <div className="container">
                    <h1>Wanneer heb jij meegegeten?</h1>
                    <p>Weekoverzicht</p>
                    <FullCalendar
                        defaultView="dayGridWeek"
                        plugins={[dayGridPlugin, interactionPlugin]}
                        events={lunch}
                        locale="nl"
                        contentHeight="auto"
                        dateClick={handleDateClick}
                    />
                    <Button
                        block
                        size="lg"
                        variant="success"
                        type="submit"
                        onClick={addToday}
                    >
                        Ik heb vandaag meegeluncht
					</Button>
                </div>
            </div>
        </div>
    );
}

export default RegisterLunch;