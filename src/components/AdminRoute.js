import React from "react";
import { Route, Redirect } from "react-router-dom";

const AdminRoute = ({ component: Component, ...rest }) => {
	return (
		<Route
			{...rest}
			render={(props) =>
				window.sessionStorage.getItem("role") === "ADMIN" ? (
					<Component {...props} />
				) : (
					<Redirect to="/dashboard" />
				)
			}
		/>
	);
};

export default AdminRoute;
