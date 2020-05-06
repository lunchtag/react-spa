import React, { Component } from "react";
import auth from "../service/auth";
import { Container, Row, Col, Button } from "react-bootstrap";
import { getAllUsers } from "../service/userService";
import PinLogin from "../components/PinLogin";
import "../css/Login.css"

class Login extends Component {
	constructor(props) {
		super(props);

		this.state = {
			email: "",
			password: "",
			pinLogin: true,
			users:[]
		};
	}

	componentDidMount(){
		getAllUsers().then(res =>{
            console.log(res);
            
            if(res.status ===200){
                this.setState({users: res.data})
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
		const setPinLogin = () => {
			this.setState({pinLogin: true})
		}
		const setPasswordLogin = () => {
			this.setState({pinLogin: false})
		}
		let loginPage;
		if(this.state.pinLogin){
			loginPage=(
				<div className="pinLoginHolder">
					<PinLogin users={this.state.users} history={this.props.history}/>
					<button className="changeLoginBtn" onClick={setPasswordLogin}>Password login</button>
				</div>
			)
		}else{
			loginPage=(
				<Container>
				<Row>
					<Col>
						<h3>Inloggen:</h3>
					</Col>
				</Row>
				<Row>
					<Col>
						<label>Emailadres:</label>
						<input
							required
							type="text"
							className="form-control"
							placeholder="Vul hier uw emailadres in"
							onChange={this.handleEmailChange}
						/>
					</Col>
				</Row>
				<Row>
					<Col>
						<label>Wachtwoord:</label>
						<input
							required
							type="password"
							className="form-control"
							placeholder="Vul uw wachtwoord in"
							onChange={this.handlePasswordChange}
						/>
					</Col>
				</Row>
				<Row>
					<Button size="lg" block onClick={this.handleSubmit}>
						Bevestig
					</Button>
				</Row>

				<button className="changeLoginBtn" onClick={setPinLogin}>Pincode Login</button>
			</Container>)
		}
		return (
			<div className= "content">
				{loginPage}
			</div>
		);
	}
}

export default Login;
