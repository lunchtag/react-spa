import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Navbar from "../../components/navbar/navbar";


import {
	getAllUsers,
	updateUser,
	disableById,
} from "../../service/UserOverviewService";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	Paper,
	Typography,
	TextField,
	Button,
} from "@material-ui/core/";
import { Save, Block, AddCircleOutlineOutlined, Search } from "@material-ui/icons/";

import "../../css/UserOverView.css";
import SnackbarMessage from "../../components/SnackbarMessage";
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles({
	tableContainer: {
		marginRight: "auto",
		marginLeft: "auto",
		width: "80%",
	},
	table: {
		minWidth: 650,
	},
	button: {
		marginRight: "15px",
	},
	submit: {
		marginTop: "50px",
		marginRight: "15px",
	},
	head: {
		backgroundColor: "#3f51b5",
		color: "white",
		fontSize: 14,
	},
});

function UserOverView(props) {
	const classes = useStyles();

	const [users, setUsers] = useState([]);

	const [isLoading, setIsLoading] = useState(true);
	// Snackbar

	// Message
	const [message, setMessage] = React.useState();
	const [showMessage, setShowMessage] = React.useState(false);
	const [messageType, setMessageType] = React.useState();

	const { t } = useTranslation();

	useEffect(() => {
		getAllUsers().then((res) => {
			if (res.status === 200) {
				setUsers(res.data);
				setIsLoading(false);
			}
		});
	}, []);

	function handleDetails(id) {
		// id meesturen naar andere pagina
		props.history.push("/employee");
	}

	function handleDisable(id, isNonLocked) {
		console.log(id);
		disableById(id).then((res) => {
			if (res.status === 200) {
				getAllUsers().then((res) => {
					setUsers(res.data);
					setMessage(t("Account succesvol ge(de)blokkeerd"));
					setShowMessage(true);
					setMessageType("success");
				});
			} else {
				setMessage(t("Er is iets misgegaan"));
				setShowMessage(true);
				setMessageType("warning");
			}
		});
	}

	function handleUpdate() {
		users.map((item) => updateUser(item));
	}

	// User is de hele user, e is de waarde van het veld
	function handleOnchange(user, e) {
		const value = e.target.value;
		const field = e.target.name;

		users.forEach((item) => {
			if (item.id === user.id) {
				// item is het oude, user is de nieuwe
				switch (field) {
					case "name":
						item.name = value;
						break;
					case "lastName":
						item.lastName = value;
						break;
					case "role":
						item.role = value;
						break;
					default:
						console.log("error");
						break;
				}
			}
		});
	}

	// Filteren op actief account
	function checkIfNotLoading() {
		users.sort(function (a, b) {
			return b.isNonLocked - a.isNonLocked;
		});
	}

	function closeMessage() {
		setShowMessage(false);
	}

	return (
		<div className="flexboxes">
			{!isLoading && checkIfNotLoading()}
			<Navbar />
			<div className="rightpanel">
				<Typography variant="h2" component="h1" gutterBottom>
					{t("Overzicht gebruikers")}
				</Typography>
				<Typography variant="h4" component="h1" gutterBottom>
					{t("Totaal aantal gebruikers") + ": " + users.length}
				</Typography>
				<Paper className={classes.tableContainer} elevation={3}>
					<Table className={classes.table} aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell className={classes.head} align="center">{t("Naam")}</TableCell>
								<TableCell className={classes.head} align="center">{t("Achternaam")}</TableCell>
								<TableCell className={classes.head} align="center">{t("Email")}</TableCell>
								<TableCell className={classes.head} align="center">{t("Rol")}</TableCell>
								<TableCell className={classes.head} align="center"> </TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{users.map((item) => (
								<TableRow key={item.name}>
									<TableCell component="th" scope="row">
										<TextField
											id="standard-basic"
											name="name"
											defaultValue={item.name}
											onChange={(e) => handleOnchange(item, e)}
										/>
									</TableCell>
									<TableCell align="right">
										<TextField
											id="standard-basic"
											name="lastName"
											defaultValue={item.lastName}
											onChange={(e) => handleOnchange(item, e)}
										/>
									</TableCell>
									<TableCell align="center">{item.email}</TableCell>
									<TableCell align="right">{item.role}</TableCell>
									<TableCell align="right">
										<Button
											className={classes.button}
											color="primary"
											disabled={!item.isNonLocked}
											onClick={() => handleDetails(item.id)}
											variant="contained"
										>
											<Search/>
										</Button>
										{!item.isNonLocked ? (
											<AddCircleOutlineOutlined
												color={"primary"}
												style={{ cursor: "pointer" }}
												onClick={() => handleDisable(item.id, item.isNonLocked)}
											/>
										) : (
											<Block
												color={!item.isNonLocked ? "disabled" : "secondary"}
												style={{ cursor: "pointer" }}
												onClick={() => handleDisable(item.id, item.isNonLocked)}
											/>
										)}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
					</Paper>
				

				<div className="btn-submit">
					<Button
						startIcon={<Save />}
						fullWidth
						style={{ margin: 8 }}
						variant="contained"
						color="primary"
						onClick={handleUpdate}
					>
						{t("Wijzigingen opslaan")}
					</Button>
				</div>
			</div>

			{showMessage && (
				<SnackbarMessage
					message={message}
					messageType={messageType}
					showMessage={closeMessage}
				/>
			)}
		</div>
	);
}

export default UserOverView;
