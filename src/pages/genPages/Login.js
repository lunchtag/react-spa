import React, { Component } from "react";
import {
	Container,
	Button,
	Typography,
	TextField,
	InputAdornment,
	Grid,
	Fab,
	ButtonGroup,
} from "@material-ui/core";
import {
	AlternateEmail,
	Lock,
	TextFields,
	Dialpad,
	Check,
	Language,
} from "@material-ui/icons";
import { getAllUsers, login } from "../../service/userService";
import PinLogin from "../../components/PinLogin";
import SnackbarMessage from "../../components/SnackbarMessage";
import "../../css/Login.css";
import { withStyles } from "@material-ui/core/styles";

import { withTranslation } from 'react-i18next';


const useStyles = (theme) => ({
	root: {
		"& > *": {
			margin: theme.spacing(1),
		},
	},
	content: {
		textAlign: "center",
	},
	export: {
		position: "absolute",
		bottom: theme.spacing(5),
		right: theme.spacing(5),
	},
	language: {
		position: "absolute",
		bottom: theme.spacing(5),
		left: theme.spacing(5),
	}
});

class Login extends Component {
	constructor(props) {
		super(props);

		this.state = {
			email: "",
			password: "",
			pinLogin: true,
			users: [],
		};
	}

	componentDidMount() {
		getAllUsers().then((res) => {
			if (res.status === 200) {
				this.setState({ users: res.data });
			} else {
				this.setState({
					messageType: "warning",
					showMessage: true,
					message: "Er is iets mis gegaan",
				});
			}
		});
	}

	closeMessage = () => {
		this.setState({
			showMessage: false,
		});
	};

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

	closeMessage = (e) => {
		this.setState({
			showMessage: false,
		});
	};


	handleSubmit = (e) => {
		e.preventDefault();

		const credentials = JSON.stringify({
			email: this.state.email,
			password: this.state.password,
		});

		login(credentials).then((res) => {
			if (res.status === 200) {
				this.props.history.push("/dashboard");
			} else {
				this.setState({
					messageType: "warning",
					showMessage: true,
					message: "Er is iets mis gegaan",
				});
			}
		});
	};

	closeMessage = () => {
		this.setState({
			showMessage: false,
		});
	};

	render() {
		const { classes, t, i18n } = this.props;
		console.log(this.props)



		const setPinLogin = () => {
			this.setState({ pinLogin: true });
		};
		const setPasswordLogin = () => {
			this.setState({ pinLogin: false });
		};
		let loginPage;
		if (this.state.pinLogin) {
			loginPage = (
				<div>
					<PinLogin users={this.state.users} history={this.props.history} />
					<Fab
						color="primary"
						size="large"
						variant="extended"
						onClick={setPasswordLogin}
						className={classes.export}
					>
						<TextFields /> {t("Wachtwoord login")}
					</Fab>

					<div className={classes.language}>
						<Language fontSize="large" />
						<ButtonGroup size="large" color="primary" aria-label="outlined primary button group">
							<Button onClick={() => { i18n.changeLanguage("nl") }}>Nederlands</Button>
							<Button onClick={() => { i18n.changeLanguage("en") }}>English</Button>
						</ButtonGroup>
					</div>
				</div>
			);
		} else {
			loginPage = (
				<>
					<Typography variant="h2" component="h1" gutterBottom>
						{t("Log hier in met uw email en wachtwoord")}
					</Typography>
					<Container maxWidth="md">
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
							id="standard-basic"
							label="Email"
							onChange={this.handleEmailChange}
						/>
						<TextField
							required
							style={{ margin: 8 }}
							variant="outlined"
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<Lock />
									</InputAdornment>
								),
							}}
							fullWidth
							type="password"
							id="standard-basic"
							label={t("Wachtwoord")}
							onChange={this.handlePasswordChange}
						/>
						<Button
							color="primary"
							style={{ margin: 8 }}
							fullWidth
							variant="contained"
							size="large"
							onClick={this.handleSubmit}
						>
							<Check />
						</Button>
						<Fab
							color="primary"
							size="large"
							variant="extended"
							onClick={setPinLogin}
							className={classes.export}
						>
							
							<Dialpad /> Pincode login
						</Fab>
						<div className={classes.language}>
						<Language fontSize="large" />
						<ButtonGroup size="large" color="primary" aria-label="outlined primary button group">
							<Button onClick={() => { i18n.changeLanguage("nl") }}>Nederlands</Button>
							<Button onClick={() => { i18n.changeLanguage("en") }}>English</Button>
						</ButtonGroup>
					</div>
					</Container>
				</>
			);
		}
		return (
			<Grid className={classes.content}>
				{loginPage}
				{this.state.showMessage ? (
					<SnackbarMessage
						message={this.state.message}
						messageType={this.state.messageType}
						showMessage={this.closeMessage}
					/>
				) : null}
			</Grid>
		);
	}
}

export default withTranslation()(withStyles(useStyles)(Login));
