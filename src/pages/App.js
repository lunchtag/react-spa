import React from "react";
import "../css/App.css";
import { BrowserRouter, Switch, Redirect } from "react-router-dom";
import PublicRoute from "../components/PublicRoute";
import PrivateRoute from "../components/PrivateRoute";
import AdminRoute from "../components/AdminRoute";
import Login from "./Login.js";
import UserLunchOverView from "./UserLunchOverView";
import Register from "./Register";
import LunchOverview from "../secPages/LunchOverview";
import Navbar from "../components/navbar/navbar.js";
import RegisterLunch from "../components/RegisterLunch";
import SecAddLunch from "../secPages/SecAddLunch";
import CreateUser from "../secPages/CreateUser";

import LogoutPage from "./Logout";

export default class App extends React.Component {
	render() {
		return (
			<BrowserRouter>
				<Switch>
					<PublicRoute restricted={false} component={Login} path="/" exact />
					<PrivateRoute path="/nav" component={Navbar} />
					<PrivateRoute
						restricted={false}
						component={UserLunchOverView}
						path="/dashboard"
						exact
					/>
					<PrivateRoute path="/lunch" component={LunchOverview} />
					<PrivateRoute path="/register" component={Register} />
					<PrivateRoute path="/add" component={RegisterLunch} />
					<AdminRoute path="/secaddlunch" component={SecAddLunch} />
					<AdminRoute path="/seccreateuser" component={CreateUser} />
					<PublicRoute path="/logout" component={LogoutPage} />
				</Switch>
			</BrowserRouter>
		);
	}
}
