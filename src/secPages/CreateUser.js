import React, { Component } from "react";
//import { Container, Row, Button } from "react-bootstrap";
import Navbar from "../components/navbar/navbar";
import { createUser } from "../service/userService";

import { Container, Grid, Button, Typography, TextField, FormControl, InputAdornment } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { AlternateEmail, Save } from '@material-ui/icons'
// import classes from "*.module.css";

const useStyles = makeStyles((theme) => ({
	root: {

	},
}));

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
		createUser(this.state.email, this.state.firstName, this.state.lastName);
	};

	render() {
		return (
			<div className="flexboxes">
				<div className="leftpanel">
					<Navbar />
				</div>
				<div className="rightpanel">
					<Container maxWidth="md">
						<Typography variant="h2" component="h1" gutterBottom>Maak een gebruiker aan</Typography>

						<TextField required style={{ margin: 8 }} variant="outlined" InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<AlternateEmail />
								</InputAdornment>
							),
						}} fullWidth xs={12} id="standard-basic" label="Email" onChange={this.handleEmailChange} />
						<TextField required style={{ margin: 8 }} variant="outlined" fullWidth id="standard-basic" label="Voornaam" onChange={this.handleFirstNameChange} />
						<TextField required style={{ margin: 8 }} variant="outlined" fullWidth id="standard-basic" label="Achternaam" onChange={this.handleLastNameChange} />

						<Button startIcon={<Save />} fullWidth style={{ margin: 8 }} variant="contained" color="primary" onClick={this.handleSubmit}>Bevestig</Button>
					</Container>
				</div>
			</div>
		);
	}
}
