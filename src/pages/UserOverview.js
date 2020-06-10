import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Navbar from "../components/navbar/navbar";

import {
	getAllUsers,
	updateUser,
	disableById,
} from "../service/UserOverviewService";

import { Save } from "@material-ui/icons"
import {Typography} from "@material-ui/core"

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import BlockIcon from "@material-ui/icons/Block";

import "../css/UserOverView.css";
import SnackbarMessage from "../components/SnackbarMessage";

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
});

function UserOverView(props) {
	const classes = useStyles();

	const [users, setUsers] = useState([]);

	const [orders, setOrders] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	let result = [];
	// Snackbar
	const [open, setOpen] = React.useState(false);

	// Message
	const [message, setMessage] = React.useState();
	const [showMessage, setShowMessage] = React.useState(false);
	const [messageType, setMessageType] = React.useState();
	let i = 0;

	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}

		setOpen(false);
	};

	useEffect(() => {
		getAllUsers().then((res) => {
			if (res.status === 200) {
				setUsers(res.data);
				setIsLoading(false);
			}
		});
	}, []);

	function handleDetails(id) {
		console.log("Handle details");
		// id meesturen naar andere pagina
		props.history.push("/employee");
	}

	function handleDisable(id, isNonLocked) {
		disableById(id).then((res) => {
			if (res.status === 200) {
				getAllUsers().then((res) => {
					setUsers(res.data);
					setMessage("Account succesvol ge(de)blokkeerd")
					setShowMessage(true)
					setMessageType("success")
					// window.location.reload();
				});
			}
			else {
				setMessage("Er is iets misgegaan")
				setShowMessage(true)
				setMessageType("warning")
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
		// console.log(users);
	}

	// Filteren op actief account
	function checkIfNotLoading() {
		result = users.sort(function (a, b) {
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
				<Typography variant="h2" component="h1" gutterBottom>Overzicht medewerkers</Typography>
				<Typography variant="h4" component="h1" gutterBottom>Totaal aantal personen : {users.length}</Typography>
				<TableContainer className={classes.tableContainer} component={Paper}>
					<Table className={classes.table} aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell align="center">Naam</TableCell>
								<TableCell align="center">Achternaam</TableCell>
								<TableCell align="center">Email</TableCell>
								<TableCell align="center">Rol</TableCell>
								<TableCell align="center"> </TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{users.map((item) => (
								<TableRow key={item.name}>
									<TableCell component="th" scope="row">
										<TextField
											id="standard-basic"
											label="voornaam"
											name="name"
											defaultValue={item.name}
											onChange={(e) => handleOnchange(item, e)}
										/>
									</TableCell>
									<TableCell align="right">
										<TextField
											id="standard-basic"
											label="achternaam"
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
											Details
										</Button>
										<BlockIcon
											color={!item.isNonLocked ? "disabled" : "secondary"}
											style={{ cursor: "pointer" }}
											onClick={() => handleDisable(item.id, item.isNonLocked)}
										/>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>

				<div className="btn-submit">
					<Button
						startIcon={<Save />}
						fullWidth
						style={{ margin: 8 }}
						variant="contained"
						color="primary"
						onClick={handleUpdate}
					>
						Wijzigingen opslaan
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
