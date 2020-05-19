import React, { Component } from "react";
import auth from "../service/auth";
import { Container, Button, Typography, TextField, InputAdornment } from "@material-ui/core";
import { AlternateEmail, Lock } from '@material-ui/icons'
import { getAllUsers } from "../service/userService";
import PinLogin from "../components/PinLogin";
import "../css/Login.css"
import { withStyles } from '@material-ui/core/styles';

const useStyles = theme => ({
	root: {
		'& > *': {
			margin: theme.spacing(1),
		},
	},
});

class Login extends Component {


	constructor(props) {
		super(props);

		this.state = {
			email: "",
			password: "",
			pinLogin: true,
			users: []
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
						<Button color="primary" variant="contained" size="large" onClick={this.handleSubmit}>Bevestig</Button>
						<Button variant="contained" size="large" onClick={setPinLogin}>Pincode Login</Button>
					</div>
				</Container>
			)
		}
		return (
			<div className="content">
				{loginPage}
			</div>
		);
	}
}

export default withStyles(useStyles)(Login);
