import React from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthUtils } from "../utils/AuthUtils";

const PrivateRoute = ({ component: Component, ...rest }) => {
	return (
		<Route
			{...rest}
			render={(props) =>
				AuthUtils.isLoggedIn() ? <Component {...props} /> : <Redirect to="/" />
			}
		/>
	);
};

export default PrivateRoute;
