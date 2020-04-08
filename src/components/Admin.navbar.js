import React from "react";
import { Link } from "react-router-dom";
import { AuthUtils } from "../utils/AuthUtils";
import { connect } from "react-redux";

class AdminNavbar extends React.Component {
	render() {
		if (this.props.isAdmin) {
			return (
				<div>
					<li className="Nav__item">
						<Link className="Nav__link" to="/">
							ADMIN
						</Link>
					</li>
				</div>
			);
		} else {
			return "";
		}
	}
}

const mapState = (state) => {
	return {
		isAdmin: AuthUtils.isAdmin(),
	};
};

const connectedAdminNavbar = connect(mapState)(AdminNavbar);
export { connectedAdminNavbar as AdminNavbar };
