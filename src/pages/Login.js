import React, { Component } from "react";
import auth from "../service/auth";
import { Container, Button, Typography, TextField, InputAdornment, Grid } from "@material-ui/core";
import { AlternateEmail, Lock } from '@material-ui/icons'
import { getAllUsers } from "../service/userService";
import PinLogin from "../components/PinLogin";
import SnackbarMessage from "./../components/SnackbarMessage";
import "../css/Login.css"
import { withStyles } from '@material-ui/core/styles';

const useStyles = theme => ({
	root: {
		'& > *': {
			margin: theme.spacing(1),
		},
	},
	content: {
		textAlign: 'center',
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
			showMessage: false,
			message: "",
		};
	}

	componentDidMount() {
		getAllUsers().then(res => {
			console.log(res);

			if (res.status === 200) {
				this.setState({ users: res.data })
			}
		})
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

	handleSubmit = (e) => {
		e.preventDefault();
		fetch("https://lunchtag-resource-server.herokuapp.com/auth/login", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email: this.state.email,
				password: this.state.password,
			}),
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.token != null) {
					auth.login(data);
					this.props.history.push("/dashboard");
				} else {
					this.setState({
						messageType: "error",
						showMessage: true,
						message: "Inloggegevens zijn incorrect"
					})
				}
			});
	};



	render() {
		const { classes } = this.props;

		const setPinLogin = () => {
			this.setState({ pinLogin: true })
		}
		const setPasswordLogin = () => {
			this.setState({ pinLogin: false })
		}
		let loginPage;
		if (this.state.pinLogin) {
			loginPage = (
				<div>
					<PinLogin users={this.state.users} history={this.props.history} />
					<br />
					<Button size="large" variant="contained" color="primary" onClick={setPasswordLogin}>Password login</Button>
				</div>
			)
		} else {
			loginPage = (
				<Container maxWidth="md">
					<Typography variant="h2" component="h1" gutterBottom>Inloggen</Typography>
					<TextField required style={{ margin: 8 }} variant="outlined" InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<AlternateEmail />
							</InputAdornment>
						),
					}} fullWidth xs={12} id="standard-basic" label="Email" onChange={this.handleEmailChange} />
					<TextField required style={{ margin: 8 }} variant="outlined" InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<Lock />
							</InputAdornment>
						),
					}} fullWidth type="password" xs={12} id="standard-basic" label="Wachtwoord" onChange={this.handlePasswordChange} />
					<div className={classes.root}>
						<Button variant="contained" size="large" onClick={setPinLogin}>Pincode Login</Button>
						<Button color="primary" variant="contained" size="large" onClick={this.handleSubmit}>Bevestig</Button>
					</div>
				</Container>
			)
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

export default withStyles(useStyles)(Login);
