import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
	return (
		<Route
			{...rest}
			render={(props) =>
				window.sessionStorage.getItem("role") === "USER" ? (
					<Component {...props} />
				) : (
					<Redirect to="/" />
				)
			}
		/>
	);
};

export default PrivateRoute;
