import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Auth from "../../service/auth";

class Logout extends Component {
	componentWillMount() {
		Auth.logout();
	}

	render() {
		return <Redirect to="/" />;
	}
}

export default Logout;
