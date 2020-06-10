import React, { Component } from "react";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

export default class SnackbarMessage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			showMessage: true,
			message: "",
		};
	}

	handleClose = () => {
		this.props.showMessage(false);
	};

	render() {
		return (
			<Snackbar
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "center",
				}}
				open={this.state.showMessage}
				autoHideDuration={3000}
				onClose={this.handleClose}
			>
				<Alert variant="filled" severity={this.props.messageType}>
					{this.props.message}
				</Alert>
			</Snackbar>
		);
	}
}
