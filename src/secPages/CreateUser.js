import React, { Component } from "react";
import Navbar from "../components/navbar/navbar";
import { createUser } from "../service/userService";

import {
	Container,
	Button,
	Typography,
	TextField,
	InputAdornment,
} from "@material-ui/core";
import { AlternateEmail, Save } from "@material-ui/icons";
import SnackbarMessage from "./../components/SnackbarMessage";

export default class CreateUserPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			email: "",
			password: "",
			firstName: "",
			lastName: "",
		};
	}

	closeMessage = (e) => {
		this.setState({
			showMessage: false,
		});
	};

	handleEmailChange = (event) => {
		this.setState({
			email: event.target.value,
		});
	};

	handleFirstNameChange = (event) => {
		this.setState({
			firstName: event.target.value,
		});
	};

	handleLastNameChange = (event) => {
		this.setState({
			lastName: event.target.value,
		});
	};

	handleSubmit = (e) => {
		e.preventDefault();
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
							value={this.state.email}
							onChange={this.handleEmailChange}
						/>
						<TextField
							required
							style={{ margin: 8 }}
							variant="outlined"
							fullWidth
							label="Voornaam"
							value={this.state.firstName}
							onChange={this.handleFirstNameChange}
						/>
						<TextField
							required
							style={{ margin: 8 }}
							variant="outlined"
							fullWidth
							label="Achternaam"
							value={this.state.lastName}
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
