import React, { Component } from "react";
import Navbar from "../../components/navbar/navbar";
import { updateOwnAccount } from "../../service/UserOverviewService";
import { resetPincode } from "../../service/userService";
import {
	Checkbox,
	TextField,
	InputAdornment,
	Button,
	Container,
	Box,
} from "@material-ui/core";
import { AlternateEmail, FiberPin, Save } from "@material-ui/icons";
import SnackbarMessage from "../../components/SnackbarMessage";
import { withTranslation } from 'react-i18next';

class Profile extends Component {
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

	closeMessage = (e) => {
		this.setState({
			showMessage: false,
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

		const { t} = this.props;

		return (
			<div className="flexboxes">
				<div className="leftpanel">
					<Navbar />
				</div>

				<div className="rightpanel">
					<Container>
						<Box my={5} ml={5}>
							<h2>{t("Jouw profiel")}</h2>
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
									label={t("Voornaam")}
									placeholder={firstName}
									onChange={this.onChange}
								/>
								<TextField
									id="lastName"
									style={{ margin: 8 }}
									variant="outlined"
									label={t("Achternaam")}
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
								{t("Wijzig wachtwoord")}
								{changePassword && (
									<div>
										<TextField
											required
											id="password"
											style={{ margin: 8 }}
											variant="outlined"
											xs={12}
											label={t("Wachtwoord")}
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
											label={t("Wachtwoord herhalen")}
											onChange={this.onChange}
											errorText
										/>

										{password !== password2 && (
											<div>{t("De wachtwoorden komen niet overeen!")}</div>
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
									{" " + t("Wijzigingen opslaan")}
								</Button>
							</Box>
						</form>

						<Box ml={5} my={2}>
							<Button
								variant="contained"
								color="primary"
								size="large"
								onClick={this.sendNewPincode}
							>
								<FiberPin />
								{" " + t("Stuur nieuwe pincode")}
							</Button>
						</Box>
					</Container>
				</div>

				{this.state.showMessage ? (
					<SnackbarMessage
						message={this.state.message}
						messageType={this.state.messageType}
						showMessage={this.closeMessage}
					/>
				) : null}
			</div>
		);
	}
}

export default withTranslation() (Profile);
