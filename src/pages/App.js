import React from "react";
import "../css/App.css";
import { BrowserRouter, Switch } from "react-router-dom";
import PublicRoute from "../components/PublicRoute";
import Login from "./Login.js";
import UserLunchOverView from "./UserLunchOverView";
import Register from "./Register";
import LunchOverview from "../secPages/LunchOverview";
import Navbar from "../components/navbar/navbar.js";
import RegisterLunch from "../components/RegisterLunch";
import SecAddLunch from "../secPages/AddLunch";

export default class App extends React.Component {
	render() {
		return (
			<BrowserRouter>
				<Switch>
					<PublicRoute
						restricted={false}
						component={Login}
						path="/"
						exact
					></PublicRoute>
					<PublicRoute path="/nav" component={Navbar}></PublicRoute>
					<PublicRoute
						restricted={false}
						component={UserLunchOverView}
						path="/dashboard"
						exact
					></PublicRoute>
					<PublicRoute path="/lunch" component={LunchOverview}></PublicRoute>
					<PublicRoute path="/register" component={Register}></PublicRoute>
					<PublicRoute path="/add" component={RegisterLunch}></PublicRoute>
					<PublicRoute
						parth="/secaddlunch"
						component={SecAddLunch}
					></PublicRoute>
				</Switch>
			</BrowserRouter>
		);
	}
}
