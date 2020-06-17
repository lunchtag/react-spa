import React, { Component } from "react";
import Navbar from "../../components/navbar/navbar";
import { createUser } from "../../service/userService";

import {
	Container,
	Button,
	Typography,
	TextField,
	InputAdornment,
} from "@material-ui/core";
import { AlternateEmail, Save } from "@material-ui/icons";
import SnackbarMessage from "../../components/SnackbarMessage";

export default class CreateUser extends Component {
	constructor(props) {
		super(props);

		this.state = {
			email: "",
			password: "",
			firstName: "",
			lastName: "",
			regex: /^[a-zA-Z]*$/,
		};
	}

	closeMessage = (e) => {
		this.setState({
			showMessage: false,
		});
	};

	handleEmailChange = (event) => {
		if (this.checkIfTextAllowed(event.target.value, event.target.name)) {
			this.setState({
				email: event.target.value,
			});
		}
	};

	handleFirstNameChange = (event) => {
		if (this.checkIfTextAllowed(event.target.value, event.target.name)) {
			this.setState({
				firstName: event.target.value,
			});
		}
	};

	handleLastNameChange = (event) => {
		if (this.checkIfTextAllowed(event.target.value, event.target.name)) {
			this.setState({
				lastName: event.target.value,
			});
		}
	};

	validateEmail(email) {
		const re = /^(([^<>()\\.,;:\s@"]+(\.[^<>()\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(String(email).toLowerCase());
	}

	checkIfTextAllowed = (character, name) => {
		if (name === "email") {
			this.setState({
				regex: /^[a-zA-Z@.]*$/,
			});
			console.log("REGEX WITH @");
		} else {
			this.setState({
				regex: /^[a-zA-Z0-9_ ]*$/,
			});
		}

		if (this.state.regex.test(character)) {
			return true;
		} else {
			return false;
		}
	};

	handleSubmit = (e) => {
		e.preventDefault();
		if (this.validateEmail(this.state.email)) {
			createUser(
				this.state.email,
				this.state.firstName,
				this.state.lastName
			).then((value) => {
				if (value.status === 200) {
					this.setState({
						showMessage: true,
						messageType: "success",
						message: "Account succesvol aangemaakt.",
						email: "",
						firstName: "",
						lastName: "",
					});
				} else {
					this.setState({
						showMessage: true,
						messageType: "warning",
						message: "Er is iets misgegaan.",
					});
				}
			});
		} else {
			this.setState({
				showMessage: true,
				messageType: "warning",
				message: "Email notatie klopt niet",
			});
			// melding
		}
	};

	render() {
		return (
			<div className="flexboxes">
				<Navbar />
				<div className="rightpanel">
					<Container maxWidth="md">
						<Typography variant="h2" component="h1" gutterBottom>
							Maak een gebruiker aan
						</Typography>

						<TextField
							required
							style={{ margin: 8 }}
							variant="outlined"
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<AlternateEmail />
									</InputAdornment>
								),
							}}
							fullWidth
							xs={12}
							label="Email"
							name="email"
							value={this.state.email}
							inputProps={{ maxLength: 255 }}
							onChange={this.handleEmailChange}
						/>
						<TextField
							required
							style={{ margin: 8 }}
							variant="outlined"
							fullWidth
							label="Voornaam"
							name="firstname"
							value={this.state.firstName}
							inputProps={{ maxLength: 35, pattern: "[a-zA-Z]" }}
							onChange={this.handleFirstNameChange}
						/>
						<TextField
							required
							style={{ margin: 8 }}
							variant="outlined"
							fullWidth
							label="Achternaam"
							name="lastName"
							value={this.state.lastName}
							inputProps={{ maxLength: 35 }}
							onChange={this.handleLastNameChange}
						/>

						<Button
							startIcon={<Save />}
							fullWidth
							style={{ margin: 8 }}
							variant="contained"
							color="primary"
							onClick={this.handleSubmit}
						>
							Bevestig
						</Button>
					</Container>

					{this.state.showMessage ? (
						<SnackbarMessage
							message={this.state.message}
							messageType={this.state.messageType}
							showMessage={this.closeMessage}
						/>
					) : null}
				</div>
			</div>
		);
	}
}
