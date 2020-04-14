import React, { Component } from "react";
import { Container, Row, Button } from "react-bootstrap";

class Register extends Component {
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

	handlePasswordChange = (event) => {
		this.setState({
			password: event.target.value,
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
		fetch("https:lunchtag-resource-server.herokuapp.com/auth/register", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email: this.state.email,
				password: this.state.password,
				firstName: this.state.firstName,
				lastName: this.state.lastName,
			}),
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				if (data.token != null) {
					window.alert("De gebruiker is succesvol aangemaakt!");
				}
				this.props.history.push("/");
			});
	};

	render() {
		return (
			<Container>
				<Row>
					<h3>Registreren</h3>
				</Row>
				<Row>
					<label>Email:</label>
					<input
						required
						type="text"
						className="form-control"
						placeholder="Vul uw emailadres in"
						onChange={this.handleEmailChange}
					/>
				</Row>
				<Row>
					<label>Wachtwoord:</label>
					<input
						required
						type="password"
						className="form-control"
						placeholder="Vul uw wachtwoord in"
						onChange={this.handlePasswordChange}
					/>
				</Row>
				<Row>
					<label>Voornaam:</label>
					<input
						required
						type="text"
						className="form-control"
						placeholder="Vul uw voornaam in"
						onChange={this.handleFirstNameChange}
					/>
				</Row>
				<Row>
					<label>Achternaam:</label>
					<input
						required
						type="text"
						className="form-control"
						placeholder="Vul uw achternaam in"
						onChange={this.handleLastNameChange}
					/>
				</Row>
				<Row>
					<Button
						className="btn btn-primary btn-block"
						onClick={this.handleSubmit}
					>
						Bevestig
					</Button>
				</Row>
			</Container>
		);
	}
}

export default Register;
