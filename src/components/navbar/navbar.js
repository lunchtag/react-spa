import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

class Navbar extends React.Component {
	render() {
		return (
			<div>
				<div className="welcome">Welkom</div>

				<nav>
					<Link to="/dashboard">Lunch maandoverzicht </Link>
					<Link to="/add"> Lunch weekoverzicht</Link>
					<Link to="/lunch">Lunch overview</Link>

					<Link to="/logout">Logout</Link>
				</nav>
			</div>
		);
	}
}

export default Navbar;
