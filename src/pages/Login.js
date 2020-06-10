import React, { Component } from "react";
import auth from "../service/auth";
import {
	Container,
	Button,
	Typography,
	TextField,
	InputAdornment,
	Grid,
} from "@material-ui/core";
import { AlternateEmail, Lock } from "@material-ui/icons";
import { getAllUsers, login } from "../service/userService";
import PinLogin from "../components/PinLogin";
import "../css/Login.css";
import { withStyles } from "@material-ui/core/styles";
import SnackbarMessage from "./../components/SnackbarMessage";

const useStyles = (theme) => ({
	root: {
		"& > *": {
			margin: theme.spacing(1),
		},
	},
	content: {
		textAlign: "center",
	},
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
			console.log(res);

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
				console.log(res.data);
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
		const { classes } = this.props;

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
					<br />
					<Button
						size="large"
						variant="contained"
						color="primary"
						onClick={setPasswordLogin}
					>
						Password login
					</Button>
					{this.state.showMessage ? (
						<SnackbarMessage
							message={this.state.message}
							messageType={this.state.messageType}
							showMessage={this.closeMessage}
						/>
					) : null}
				</div>
			);
		} else {
			loginPage = (
				<Container maxWidth="md">
					<Typography variant="h2" component="h1" gutterBottom>
						Inloggen
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
						xs={12}
						id="standard-basic"
						label="Wachtwoord"
						onChange={this.handlePasswordChange}
					/>
					<div className={classes.root}>
						<Button variant="contained" size="large" onClick={setPinLogin}>
							Pincode Login
						</Button>
						<Button
							color="primary"
							variant="contained"
							size="large"
							onClick={this.handleSubmit}
						>
							Bevestig
						</Button>
					</div>
					{this.state.showMessage ? (
						<SnackbarMessage
							message={this.state.message}
							messageType={this.state.messageType}
							showMessage={this.closeMessage}
						/>
					) : null}
				</Container>
			);
		}
		return <Grid className={classes.content}>{loginPage}</Grid>;
	}
}

export default withStyles(useStyles)(Login);
