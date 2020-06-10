import React, { Component } from "react";
import auth from "../service/auth";
import { Container, Button, Typography, TextField, InputAdornment, Grid, Fab } from "@material-ui/core";
import { AlternateEmail, Lock, TextFields, Dialpad, Check } from '@material-ui/icons'
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
	export: {
		position: "absolute",
		bottom: theme.spacing(5),
		right: theme.spacing(5),
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
					<Fab color="primary" size="large" variant="extended" onClick={setPasswordLogin} className={classes.export}><TextFields /> Wachtwoord login</Fab>
				</div>
			)
		} else {
			loginPage = (
				<>
				<Typography variant="h2" component="h1" gutterBottom>Log hier in met uw email en wachtwoord</Typography>
				<Container maxWidth="md">
					<TextField required style={{ margin: 8 }} variant="outlined" InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<AlternateEmail />
							</InputAdornment>
						),
					}} fullWidth  id="standard-basic" label="Email" onChange={this.handleEmailChange} />
					<TextField required style={{ margin: 8 }} variant="outlined" InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<Lock />
							</InputAdornment>
						),
					}} fullWidth type="password" id="standard-basic" label="Wachtwoord" onChange={this.handlePasswordChange} />
					<Button color="primary" style={{ margin: 8 }} fullWidth variant="contained" size="large" onClick={this.handleSubmit}><Check/></Button>
					<Fab color="primary" size="large" variant="extended" onClick={setPinLogin} className={classes.export}><Dialpad /> Pincode login</Fab>				
				</Container>
				</>
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
