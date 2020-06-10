import React from "react";
import "../css/App.css";
import { BrowserRouter, Switch } from "react-router-dom";
import PublicRoute from "../components/PublicRoute";
import PrivateRoute from "../components/PrivateRoute";
import AdminRoute from "../components/AdminRoute";
import Login from "./genPages/Login.js";
import LunchOverviewMonth from "./empPages/LunchOverviewMonth";
import Register from "./genPages/Register";
import LunchOverviewList from "./empPages/LunchOverviewList";
import LunchEmployee from "./secPages/LunchEmployee";
import Navbar from "../components/navbar/navbar.js";
import LunchOverviewWeek from "./empPages/LunchOverviewWeek";
import LunchAdd from "./secPages/LunchAdd";
import CreateUser from "./secPages/CreateUser";
import UserOverview from "./secPages/UserOverview";
import Profile from "./genPages/Profile";
import Log from "./secPages/Log";
import Logout from "./genPages/Logout";

export default class App extends React.Component {
	render() {
		return (
			<BrowserRouter>
				<Switch>
					<PublicRoute restricted={false} component={Login} path="/" exact />
					<PrivateRoute path="/nav" component={Navbar} />
					<PrivateRoute path="/profile" component={Profile} />
					<PrivateRoute
						restricted={false}
						component={LunchOverviewMonth}
						path="/dashboard"
						exact
					/>
					<PrivateRoute path="/lunch" component={LunchOverviewList} />
					<PrivateRoute path="/register" component={Register} />
					<PrivateRoute path="/add" component={LunchOverviewWeek} />
					<PrivateRoute path="/profile" component={Profile} />
					<AdminRoute path="/secaddlunch" component={LunchAdd} />
					<AdminRoute path="/employee" component={LunchEmployee} />
					<AdminRoute path="/seccreateuser" component={CreateUser} />
					<AdminRoute path="/employees" component={UserOverview} />
					<AdminRoute path="/log" component={Log} />
					<PublicRoute path="/logout" component={Logout} />
				</Switch>
			</BrowserRouter>
		);
	}
}
