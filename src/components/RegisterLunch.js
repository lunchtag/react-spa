import React, { Component } from 'react'
import { Button } from "react-bootstrap";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";

import '../css/RegisterLunch.css'
function RegisterLunch() {
    const events = [{ title: "Event van vandaag", date: new Date() }];


    function addlunch(lunchDate) {
        fetch('accounts/' + window.sessionStorage.getItem("userId") + '/lunches', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                date: lunchDate,
                name: "Test"
            })
        }).then(
            window.alert("De lunch is succesvol toegevoegd!")
        )
    }

    function addToday() {
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();

        today = mm + '/' + dd + '/' + yyyy;
        addlunch(today);
    }

    return (
        <div className="container">
            <h1>Wanneer heb jij meegegeten?</h1>
            <p>Weekoverzicht</p>
            <FullCalendar
                defaultView="dayGridWeek"
                plugins={[dayGridPlugin]}
                events={events}
                locale="nl"
                contentHeight='auto'
            />
            <Button block size="lg" variant="success" type="submit" onClick={addToday}>
                Ik heb vandaag meegeluncht
                </Button>
        </div>
    )

}

export default RegisterLunch
