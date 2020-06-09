import React from "react";

import { TableCell, TableRow, Typography, IconButton } from "@material-ui/core";
import { Delete } from "@material-ui/icons";

function EmployeeLunchItem(props) {
	const lunchItem = props.lunch;

	function deleteLunch(event) {
		const url =
			"https://lunchtag-resource-server.herokuapp.com/lunch/" + lunchItem.id;
		fetch(url, {
			method: "DELETE",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization: "Bearer " + window.sessionStorage.getItem("token"),
			},
		}).then((res) => {
			if (res.status === 200) {
				props.callback("success");
			} else {
				props.callback("warning");
			}
		});
	}

	return (
		<TableRow>
			<TableCell align="middle">
				<Typography variant="h6" gutterBottom>
					{new Date(lunchItem.date).toDateString()}
				</Typography>
			</TableCell>
			<TableCell align="right">
				<IconButton onClick={deleteLunch}>
					<Delete color="error" />
				</IconButton>
			</TableCell>
		</TableRow>
	);
}

export default EmployeeLunchItem;
