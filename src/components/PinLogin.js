import React, { useState } from "react";
import "../css/PinLogin.css";
import NumericKeyPad from "./NumericKeyPad";
import { pinLoginCall } from "../service/userService";
import auth from "../service/auth";
import {
	Grid,
	Typography,
	Paper,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Divider,
	Container,
	Modal,
	Backdrop,
	Fade,
	TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Person } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	paper: {
		textAlign: "center",
		color: theme.palette.text.primary,
		backgroundColor: "#f2f2f2",
		height: 100,
		width: 100,
		fontSize: 60,
	},
	div: {
		height: 300,
	},
	list: {
		textAlign: "center",
	},
	modal: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	modalContainer: {
		textAlign: "center",
		color: theme.palette.text.primary,
		backgroundColor: "#ffffff",
		padding: "2%",
	},
	input: {
		paddingBottom: "5%",
	},
}));

function PinLogin(props) {
	const classes = useStyles();

	const [filteredUsers, setFilteredUsers] = useState([]);
	const [pin, setPin] = useState("");
	const [currentUser, setCurrentUser] = useState({});
	const [showPopup, setShowPopup] = useState(false);
	const [wrongCredentials, setwrongCredentials] = useState(false);
	let firstRow = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"];
	let secondRow = ["a", "s", "d", "f", "g", "h", "j", "k", "l"];
	let thirdRow = ["z", "x", "c", "v", "b", "n", "m"];

	function filterUsers(letter) {
		let filterUsersArray = props.users.filter(
			checkFirstLetter.bind(this, letter)
		);
		setFilteredUsers(filterUsersArray);
	}

	function checkFirstLetter(letter, element) {
		return element.name.charAt(0).toLowerCase() === letter;
	}

	let filteredUsersDiv = (
		<Container className={classes.div}>
			<Typography variant="h2" component="h1" gutterBottom>
				Selecteer de eerste letter van uw naam
			</Typography>
		</Container>
	);

	const appendToPin = (value) => {
		if (pin.length + 1 === 5) {
			let confirmedPin = pin.concat(value);
			setPin(pin.concat(value));
			pinLoginCall(confirmedPin, currentUser.email).then((res) => {
				if (res.status === 200) {
					if (res.data.token != null) {
						auth.login(res.data);
						props.history.push("/dashboard");
					}
				} else {
					setwrongCredentials(true);
				}
			});
		} else if (pin.length <= 4) {
			setPin(pin.concat(value));
		}
	};

	const removeFromPin = () => {
		if (wrongCredentials) {
			setPin("");
		} else {
			setPin(pin.substring(0, pin.length - 1));
		}

		setwrongCredentials(false);
	};

	const popup = (value) => {
		setCurrentUser(value);
		setShowPopup(true);
	};

	const closePopup = () => {
		setShowPopup(false);
		setPin("");
		setwrongCredentials(false);
	};

	if (filteredUsers.length > 0) {
		filteredUsersDiv = (
			<Container className={classes.div}>
				<List component="nav" aria-label="main mailbox folders">
					{filteredUsers.map((value) => {
						return (
							<>
								<ListItem
									className={classes.list}
									button
									onClick={() => popup(value)}
								>
									<ListItemIcon>
										<Person />
									</ListItemIcon>
									<ListItemText
										primary={`${value.name} ${value.lastName}`}
									></ListItemText>
								</ListItem>
								<Divider />
							</>
						);
					})}
				</List>
			</Container>
		);
	}
	return (
		<div className="pinLogin">
			{filteredUsersDiv}
			<Grid className={classes.root} container spacing={3}>
				<Grid item xs={12} container justify="center" spacing={3}>
					{firstRow.map((value) => {
						return (
							<Grid item key={value}>
								<Paper
									className={classes.paper}
									onClick={() => filterUsers(value)}
								>
									{value}
								</Paper>
							</Grid>
						);
					})}
				</Grid>
				<Grid item xs={12} container justify="center" spacing={3}>
					{secondRow.map((value) => {
						return (
							<Grid item key={value}>
								<Paper
									className={classes.paper}
									onClick={() => filterUsers(value)}
								>
									{value}
								</Paper>
							</Grid>
						);
					})}
				</Grid>
				<Grid item xs={12} container justify="center" spacing={3}>
					{thirdRow.map((value) => {
						return (
							<Grid item key={value}>
								<Paper
									className={classes.paper}
									onClick={() => filterUsers(value)}
								>
									{value}
								</Paper>
							</Grid>
						);
					})}
				</Grid>
			</Grid>

			<Modal
				aria-labelledby="transition-modal-title"
				aria-describedby="transition-modal-description"
				className={classes.modal}
				open={showPopup}
				onClose={closePopup}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}
			>
				<Fade in={showPopup}>
					<Container maxWidth="xs" className={classes.modalContainer}>
						<Typography variant="h5" component="h1" gutterBottom>
							{currentUser.name + " " + currentUser.lastName}
						</Typography>
						{!wrongCredentials ? (
							<TextField
								className={classes.input}
								fullWidth
								label="Pincode"
								type="password"
								value={pin}
								InputProps={{ readOnly: true }}
								variant="outlined"
							/>
						) : (
							<TextField
								className={classes.input}
								fullWidth
								type="password"
								error
								label="Pincode"
								helperText="Verkeerde pincode"
								value={pin}
								InputProps={{ readOnly: true }}
								variant="outlined"
							/>
						)}

						<NumericKeyPad addToPin={appendToPin} removePin={removeFromPin} />
					</Container>
				</Fade>
			</Modal>
		</div>
	);
}

export default PinLogin;
