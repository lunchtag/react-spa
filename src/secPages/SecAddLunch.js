import React from "react";
import Calander from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../css/Calendar.css";
import Navbar from "../components/navbar/navbar";
import { getAllUserWithLunches } from "../service/userService";
import { addLunch, deleteLunch } from "../service/secLunchService";
import {
	Typography,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Paper,
	Grid,
} from "@material-ui/core";
import { CheckBox } from "@material-ui/icons";
import { Alert } from "@material-ui/lab";
import { withStyles } from "@material-ui/core/styles";
import SnackbarMessage from "./../components/SnackbarMessage";

const useStyles = (theme) => ({
	input: {
		minWidth: "50%",
		paddingBottom: "1%",
	},
});

class SecAddLunch extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			users: [],
			selectedUser: "",
			date: new Date(),
			lunchedDays: [],
			showMessage: false,
			message: "",
		};
		this.onChangeUser = this.onChangeUser.bind(this);
	}

	closeMessage = (e) => {
		this.setState({
			showMessage: false,
		});
	};

	componentDidMount() {
		getAllUserWithLunches().then((value) => {
			if (value.status === 200) {
				this.setState({
					users: value.data,
				});
			}
		});
	}

	retrieveDataFromServer() {
		getAllUserWithLunches().then((value) => {
			if (value.status === 200) {
				this.setState({
					users: value.data,
				});
			}
		});
	}

	onChangeUser(event) {
		const user = this.state.users.find(function (element) {
			return element.account.id === event.target.value;
		});
		this.setState({
			selectedUser: user,
		});

		const dates = [];

		user.lunches.forEach((element) => {
			const res = element.date.split("T", 1);
			dates.push({ id: element.id, date: new Date(res) });
		});

		this.setState({
			lunchedDays: dates,
		});

		this.retrieveDataFromServer();
	}

	render() {
		const { classes } = this.props;

		const onChange = (date) => {
			if (Object.keys(this.state.selectedUser).length !== 0) {
				for (let i = 0; i < this.state.lunchedDays.length; i++) {
					const loopDate = this.state.lunchedDays[i];
					if (
						date.getFullYear() === loopDate.date.getFullYear() &&
						date.getMonth() === loopDate.date.getMonth() &&
						date.getDate() === loopDate.date.getDate()
					) {
						deleteLunch(this.state.selectedUser.account.id, loopDate.id).then(
							(value) => {
								if (value) {
									if (value.status === 200) {
										let newLunchedDays = this.state.lunchedDays;
										newLunchedDays.splice(i, 1);
										this.setState({
											date: date,
											LunchedDays: newLunchedDays,
											showMessage: true,
											messageType: "success",
											message: "Lunch succesvol verwijderd",
										});
									} else {
										this.setState({
											showMessage: true,
											messageType: "warning",
											message: "Er is iets misgegaan.",
										});
									}
								}
							}
						);
						return;
					}
				}
				addLunch(this.state.selectedUser.account.id, date).then((value) => {
					if (value.status === 200) {
						let newLunchedDays = this.state.lunchedDays;
						newLunchedDays.push({ id: value.data.id, date: date });
						this.setState({
							date: date,
							lunchedDays: newLunchedDays,
							showMessage: true,
							messageType: "success",
							message: "Lunch succesvol toegevoegd.",
						});
					} else {
						this.setState({
							showMessage: true,
							messageType: "warning",
							message: "Er is iets misgegaan.",
						});
					}
				});
			}
		};
		const tileContent = ({ date, view }) => {
			if (view === "month") {
				for (var i = 0; i < this.state.lunchedDays.length; i++) {
					const loopDate = this.state.lunchedDays[i].date;
					if (
						date.getFullYear() === loopDate.getFullYear() &&
						date.getMonth() === loopDate.getMonth() &&
						date.getDate() === loopDate.getDate()
					) {
						return (
							<>
								<br />
								<CheckBox />
							</>
						);
					}
				}
			}
			return null;
		};
		const tileClassName = ({ date, view }) => {
			if (view === "month") {
				for (var i = 0; i < this.state.lunchedDays.length; i++) {
					const loopDate = this.state.lunchedDays[i].date;
					if (
						date.getFullYear() === loopDate.getFullYear() &&
						date.getMonth() === loopDate.getMonth() &&
						date.getDate() === loopDate.getDate()
					) {
						return "lunched";
					}
				}
			}
			return null;
		};

		const { date } = this.state;

		return (
			<div className="flexboxes">
				<Navbar />
				<div className="rightpanel">
					<div className="content">
						<Typography variant="h2" component="h1" gutterBottom>
							Lunch toevoegen
						</Typography>
						<FormControl className={classes.input} variant="outlined">
							{this.state.selectedUser === "" ? (
								<InputLabel>Selecteer hier een medewerker</InputLabel>
							) : (
								<InputLabel>Medewerker</InputLabel>
							)}

							<Select onChange={this.onChangeUser}>
								{this.state.users.map((user, i) => {
									return (
										<MenuItem value={user.account.id} key={i}>
											{user.account.name + " " + user.account.lastName}
										</MenuItem>
									);
								})}
							</Select>
						</FormControl>

						{this.state.selectedUser !== "" && (
							<>
								<br />
								<Grid container justify="center">
									<Paper elevation={3} className="calendar">
										<Calander
											onChange={onChange}
											value={date}
											showWeekNumbers
											maxDate={new Date()}
											onClickDay={this.onClickDay}
											tileContent={tileContent}
											tileClassName={tileClassName}
										/>
									</Paper>
									<Alert
										variant="outlined"
										style={{ marginTop: 8 }}
										severity="info"
									>
										Klik op een datum om een lunch van een medewerker toe te
										voegen of te verwijderen
									</Alert>
								</Grid>
							</>
						)}
					</div>

					{this.state.showMessage ? (
						<SnackbarMessage
							message={this.state.message}
							messageType={this.state.messageType}
							showMessage={this.closeMessage}
						/>
					) : null}
				</div>
			</div>
		);
	}
}

export default withStyles(useStyles)(SecAddLunch);
