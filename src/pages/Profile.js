import React, { Component } from "react";
import Navbar from "../components/navbar/navbar";
import { updateOwnAccount } from "../service/UserOverviewService";

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

	sendNewPincode() {
		console.log("Sending new pincode...");
	}

	saveNewProfileSettings = (e) => {
		e.preventDefault();
		console.log("Save profile settings..");
		let account = {
			firstName: this.state.firstName,
			lastName: this.state.lastName,
			password: "testje",
		};

		// if (this.state.changePassword && this.state.passwordsMatch) {
		// 	account.add(this.state.password);
		// }
		// console.log(account);

		updateOwnAccount(account);
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
					<div>
						<form onSubmit={this.saveNewProfileSettings}>
							Email (unable to change)
							<input
								id="email"
								type="text"
								onChange={this.onChange}
								placeholder={email}
								disabled
							/>
							<br />
							<input
								id="changePassword"
								type="checkbox"
								onChange={this.changePasswordToggle}
							></input>
							Change password?
							{changePassword && (
								<div>
									Password
									<input
										id="password"
										type="password"
										onChange={this.onChange}
									></input>
									<br />
									Password 2
									<input
										id="password2"
										type="password"
										onChange={this.onChange}
									></input>
									{password !== password2 && <div>Passwords do not match </div>}
								</div>
							)}
							<br />
							FirstName
							<input
								id="firstName"
								type="text"
								placeholder={firstName}
								onChange={this.onChange}
							></input>
							<br />
							Lastname
							<input
								id="lastName"
								type="text"
								placeholder={lastName}
								onChange={this.onChange}
							></input>
							<br />
							<input type="submit"></input>
						</form>
					</div>

					<button onClick={this.sendNewPincode}>Send new pincode</button>
				</div>
			</div>
		);
	}
}
