import React from "react";

import { TableCell, TableRow, Typography, IconButton } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import { deleteLunchId } from "./../service/lunchService";

import { useTranslation } from 'react-i18next';

function EmployeeLunchItem(props) {
	const lunchItem = props.lunch;
	const { i18n } = useTranslation()

	var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

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
			<TableCell align="middle">
				<Typography variant="h6" gutterBottom>
					{i18n.language === 'nl' ?
						new Date(lunchItem.date).toLocaleDateString('nl-NL', options) :
						new Date(lunchItem.date).toDateString()
					}
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
