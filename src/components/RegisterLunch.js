import React, { useState, Component } from 'react'
import { Button } from "react-bootstrap";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";

import '../css/RegisterLunch.css'
function RegisterLunch() {

    const [lunch, setLunch] = useState([
        {
            title: "Lunch",
            date: new Date("2020-04-10")
        }
    ])

    function getLunches() {
        const url = 'http://localhost:8090/accounts/' + window.sessionStorage.getItem("userId") + '/lunches'
        fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + window.sessionStorage.getItem("token")
            }
        })
            .then(res => res.json()).catch()
            .then((data) => {
                setLunch(data)
            })
    }

    function addlunchApi(lunch) {
        fetch('http://localhost:8090/accounts/' + window.sessionStorage.getItem("userId") + '/lunches', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: lunch.title,
                date: lunch.date
            })
        }).then(() => {
            window.alert("De lunch is succesvol toegevoegd!");
        })
    }


    function addToday() {
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();

        today = mm + '/' + dd + '/' + yyyy;

        const date = new Date(today);

        const newLunch = {
            title: "Lunch",
            date: date
        }
        setLunch(oldLunches => [...oldLunches, newLunch]);
        //addlunchApi(lunch);
    }

    // Wanneer er op een datum wordt geklikt
    const handleDateClick = arg => {
        const date = new Date(arg.dateStr);
        const newLunch = {
            title: "Lunch",
            date: date
        }
        // addlunchApi(lunch)
        setLunch(oldLunches => [...oldLunches, newLunch]); // Dit update de lunch array , Wanneer dit samen werkt met de api, kunnen we ook alle lunches ophalen en die in de array zetten
        console.log(lunch);
    }

    return (
        <div className="container">
            <h1>Wanneer heb jij meegegeten?</h1>
            <p>Weekoverzicht</p>
            <FullCalendar
                defaultView="dayGridWeek"
                plugins={[dayGridPlugin, interactionPlugin]}
                events={lunch}
                locale="nl"
                contentHeight='auto'
                dateClick={handleDateClick}
            />
            <Button block size="lg" variant="success" type="submit" onClick={addToday}>
                Ik heb vandaag meegeluncht
                </Button>
        </div>
    )

}

export default RegisterLunch



// function addTomorrow() {
//     let d = new Date("2020-04-10")
//     let a = new Date("2020-04-11")

    // let datums = [
    //     {
    //         title: "Lunch",
    //         date: d
    //     },
    //     {
    //         title: "Lunch",
    //         date: a
    //     }
    // ]

//     setLunch(datums)
// }