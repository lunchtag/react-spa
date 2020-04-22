import React, { Component } from "react";
import { Container, Row, Button } from "react-bootstrap";
import Navbar from "../components/navbar/navbar";
import { createUser } from "../service/userService";

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
					<Container>
						<Row>
							<h3>Maak gebruiker aan</h3>
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
				</div>
			</div>
		);
	}
}
