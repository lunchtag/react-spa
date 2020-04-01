import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

class Navbar extends React.Component {
	render() {
		return (
			<div class="flexboxes">
				<div class="leftpanel">
					<div class="welcome">Welkom lilleke natnek</div>

					<nav>
						<Link to="/inschrijven">Inschrijven</Link>
						<Link to="/overzicht">Overzicht</Link>

						<Link to="/logout">Logout</Link>
					</nav>
				</div>
				<div class="rightpanel"></div>
			</div>
		);
	}
}

export default Navbar;
