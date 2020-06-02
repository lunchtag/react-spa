import React, { Component } from "react";
import Navbar from "../components/navbar/navbar";
import { updateOwnAccount } from "../service/UserOverviewService";
import { resetPincode } from "../service/userService";
import {
	Checkbox,
	TextField,
	InputAdornment,
	Button,
	Container,
	Snackbar,
	Box,
} from "@material-ui/core";
import { spacing } from "@material-ui/system";

import { Alert } from "@material-ui/lab";
import { AlternateEmail, FiberPin, Save } from "@material-ui/icons";

export default class Profile extends Component {
	constructor(props) {
		super(props);

		this.state = {
			email: "",
			password: "",
			password2: "",
			firstName: "",
			lastName: "",
			passwordsMatch: true,
			changePassword: false,
			showMessage: false,
			message: "",
		};

		this.sendNewPincode = this.sendNewPincode.bind();
		this.saveNewProfileSettings = this.saveNewProfileSettings.bind();
		this.onChange = this.onChange.bind();
		this.changePasswordToggle = this.changePasswordToggle.bind();
	}

	componentDidMount() {
		this.setState({
			email: window.sessionStorage.getItem("email"),
			firstName: window.sessionStorage.getItem("firstName"),
			lastName: window.sessionStorage.getItem("lastName"),
		});
	}

	sendNewPincode = () => {
		console.log("Sending new pincode...");
		resetPincode().then((value) => {
			if (value.status === 200) {
				this.setState({
					showMessage: true,
					messageType: "success",
					message: "Please check your email for the new pin code.",
				});
			} else {
				this.setState({
					showMessage: true,
					messageType: "warning",
					message: "Something went wrong. HTTP status:" + value.status,
				});
			}
		});
	};

	saveNewProfileSettings = (e) => {
		e.preventDefault();

		let account = {
			firstName: this.state.firstName,
			lastName: this.state.lastName,
		};

		if (this.state.changePassword) {
			account = {
				firstName: this.state.firstName,
				lastName: this.state.lastName,
				password: this.state.password,
			};
		}

		updateOwnAccount(account).then((value) => {
			if (value.status === 200) {
				this.setState({
					showMessage: true,
					messageType: "success",
					message: "Account succesfully updated.",
				});
				window.sessionStorage.setItem("firstName", this.state.firstName);
				window.sessionStorage.setItem("lastName", this.state.lastName);
			} else {
				this.setState({
					showMessage: true,
					messageType: "warning",
					message: "Something went wrong. HTTP status:" + value.status,
				});
			}
		});
	};

	onChange = (item) => {
		this.setState({
			[item.target.id]: item.target.value,
		});
	};

	changePasswordToggle = (item) => {
		this.setState({
			[item.target.id]: item.target.checked,
		});
	};

	render() {
		const {
			email,
			password,
			password2,
			firstName,
			lastName,
			changePassword,
		} = this.state;

		return (
			<div className="flexboxes">
				<div className="leftpanel">
					<Navbar />
				</div>

				<div className="rightpanel">
					<Container>
						<Box my={5} ml={5}>
							<h2> Jouw profiel</h2>
						</Box>

						<form onSubmit={this.saveNewProfileSettings}>
							<Container>
								<TextField
									style={{ margin: 8 }}
									variant="outlined"
									InputProps={{
										startAdornment: (
											<InputAdornment position="start">
												<AlternateEmail />
											</InputAdornment>
										),
									}}
									label="Email"
									placeholder={email}
									disabled
								/>
							</Container>
							<Container>
								<TextField
									id="firstName"
									style={{ margin: 8 }}
									variant="outlined"
									label="First Name"
									placeholder={firstName}
									onChange={this.onChange}
								/>
								<TextField
									id="lastName"
									style={{ margin: 8 }}
									variant="outlined"
									label="Last Name"
									placeholder={lastName}
									onChange={this.onChange}
								/>
							</Container>
							<Container>
								<Checkbox
									id="changePassword"
									color="Primary"
									onChange={this.changePasswordToggle}
								/>
								Change password?
								{changePassword && (
									<div>
										<TextField
											required
											id="password"
											style={{ margin: 8 }}
											variant="outlined"
											xs={12}
											label="Password"
											type="password"
											onChange={this.onChange}
										/>

										<TextField
											required
											id="password2"
											type="password"
											style={{ margin: 8 }}
											variant="outlined"
											xs={12}
											label="Repeat password"
											onChange={this.onChange}
											errorText
										/>

										{password !== password2 && (
											<div>Passwords do not match!</div>
										)}
									</div>
								)}
							</Container>
							<Box ml={5} my={2}>
								<Button
									type="submit"
									variant="contained"
									color="primary"
									size="large"
								>
									<Save />
									Wijzigingen opslaan
								</Button>
							</Box>
						</form>
						<Snackbar
							open={this.state.showMessage}
							autoHideDuration={4000}
							onClose={() => {
								this.setState({ showMessage: false });
							}}
							anchorOrigin={{ vertical: "top", horizontal: "center" }}
							key="top, center"
						>
							<Alert variant="filled" severity={this.state.messageType}>
								{this.state.message}
							</Alert>
						</Snackbar>
						<Box ml={5} my={2}>
							<Button
								variant="contained"
								color="primary"
								size="large"
								onClick={this.sendNewPincode}
							>
								<FiberPin />
								Stuur nieuwe pincode
							</Button>
						</Box>
					</Container>
				</div>
			</div>
		);
	}
}
