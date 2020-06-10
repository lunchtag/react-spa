import React from "react";

import { TableRow, TableCell, IconButton, Typography } from "@material-ui/core";
import { DeleteRounded } from "@material-ui/icons";
import { deleteLunchId } from "./../service/lunchService";

function LunchItem(props) {
	const lunchItem = props.lunch;

	function deleteLunch(event) {
		deleteLunchId(lunchItem.id).then((res) => {
			if (res.status === 200) {
				props.callback("success");
			} else {
				props.callback("warning");
			}
		});
	}

	return (
		<TableRow>
			<TableCell align="left">
				<Typography variant="h6" gutterBottom>
					{lunchItem.account.name + " " + lunchItem.account.lastName}
				</Typography>
			</TableCell>
			<TableCell align="center">
				<Typography variant="h6" gutterBottom>
					{new Date(lunchItem.date).toDateString()}
				</Typography>
			</TableCell>
			<TableCell align="right">
				<IconButton onClick={deleteLunch}>
					<DeleteRounded color="error"></DeleteRounded>
				</IconButton>
			</TableCell>
		</TableRow>
	);
}

export default LunchItem;
