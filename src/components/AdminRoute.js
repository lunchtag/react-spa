import React from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthUtils } from "../utils/AuthUtils";

const AdminRoute = ({ component: Component, ...rest }) => {
	return (
		<Route
			{...rest}
			render={(props) =>
				AuthUtils.isLoggedIn() && AuthUtils.isAdmin() ? (
					<Component {...props} />
				) : (
					<Redirect to="/" />
				)
			}
		/>
	);
};

export default AdminRoute;
