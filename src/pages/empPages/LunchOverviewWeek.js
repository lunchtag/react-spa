import React, { useState, useEffect } from "react";
//import auth from "../service/auth";
import dateFormat from "dateformat";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import "../../css/RegisterLunch.css";
import Navbar from "../../components/navbar/navbar";

import { Container, Button, Typography } from "@material-ui/core";
import { Today } from "@material-ui/icons";
import { Alert } from "@material-ui/lab";
import SnackbarMessage from "../../components/SnackbarMessage";
import {
	deleteLunchId,
	getAllLunchesForUser,
	addLunch2,
} from "../../service/lunchService";

import { useTranslation } from 'react-i18next';

function LunchOverviewWeek() {
	let deleted;

	const {t} = useTranslation();

	//const jwtData = auth.parseJwt(window.sessionStorage.getItem("token"));

	const [lunch, setLunch] = useState([
		{
			id: "",
			title: "Lunch",
			date: new Date("2020-04-10"),
		},
	]);

	// Message
	const [message, setMessage] = React.useState();
	const [showMessage, setShowMessage] = React.useState(false);
	const [messageType, setMessageType] = React.useState();

	function closeMessage() {
		setShowMessage(false);
	}

	function getLunches() {
		getAllLunchesForUser().then((res) => {
			if (res.status === 200) {
				setLunch(res.data);
			} else {
				setMessage("Je hebt nog geen lunches");
				setShowMessage(true);
				setMessageType("info");
			}
		});
	}

	function deleteLunchApi(lunchId) {
		deleteLunchId(lunchId).then((response) => {
			if (response.status === 200) {
				setMessage("Lunch succesvol verwijderd");
				setShowMessage(true);
				setMessageType("success");
			} else {
				setMessage("Er is iets misgegaan");
				setShowMessage(true);
				setMessageType("warning");
			}

			getLunches();
		});
	}

	function checkDelete(newLunch) {
		deleted = false;
		// Eerst even kijken of er gedeleted moet worden of niet
		lunch.forEach((l) => {
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
		});
	}

	function addlunchApi(newLunch) {
		checkDelete(newLunch);
		if (!deleted) {
			let data = JSON.stringify({
				name: newLunch.title,
				date: newLunch.date,
			});

			addLunch2(data).then((res) => {
				if (res.status === 200) {
					setMessage("Lunch succesvol toegevoegd");
					setShowMessage(true);
					setMessageType("success");
					getLunches();
				} else {
					setMessage("Er is iets misgegaan");
					setShowMessage(true);
					setMessageType("warning");
				}
			});

			setLunch((oldLunches) => [...oldLunches, newLunch]); // Dit update de lunch array , Wanneer dit samen werkt met de api, kunnen we ook alle lunches ophalen en die in de array zetten
		}
	}

	function addToday() {
		let today = new Date();
		let dd = String(today.getDate()).padStart(2, "0");
		let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
		let yyyy = today.getFullYear();

		today = mm + "/" + dd + "/" + yyyy;

		const date = dateFormat(today, "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'");

		const newLunch = {
			title: "Lunch",
			date: date,
		};
		addlunchApi(newLunch);
	}

	// Wanneer er op een datum wordt geklikt
	const handleDateClick = (arg) => {
		const currentDate = new Date();
		const date = dateFormat(arg.dateStr, "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'");
		const newLunch = {
			title: "Lunch",
			date: date,
		};
		if (arg.date < currentDate) {
			addlunchApi(newLunch);
		}
	};

	useEffect(() => {
		getLunches();
	}, []);

	return (
		<div class="flexboxes">
			<Navbar />
			<div class="rightpanel">
				<Container maxWidth="lg">
					<Typography variant="h2" component="h1" gutterBottom>
						Week
					</Typography>
					<FullCalendar
						defaultView="dayGridWeek"
						plugins={[dayGridPlugin, interactionPlugin]}
						events={lunch}
						locale="nl"
						contentHeight="auto"
						dateClick={handleDateClick}
					/>
					<Button
						variant="contained"
						color="primary"
						size="large"
						onClick={addToday}
					>
						<Today /> {t("Ik heb vandaag meegeluncht")}
					</Button>
					<Alert variant="outlined" style={{ marginTop: 8 }} severity="info">
						{t("Klik op een datum om aan te geven of je hebt meegeluncht")}
					</Alert>
				</Container>

				{showMessage && (
					<SnackbarMessage
						message={message}
						messageType={messageType}
						showMessage={closeMessage}
					/>
				)}
			</div>
		</div>
	);
}

export default LunchOverviewWeek;
