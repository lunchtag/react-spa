import React from "react";
import Calander from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../css/Calendar.css";
import Navbar from "../components/navbar/navbar";
import { getAllUserWithLunches } from "../service/userService";
import { addLunch, deleteLunch } from "../service/secLunchService";
import { Typography,FormControl, InputLabel, Select, MenuItem, Paper, Grid } from "@material-ui/core";
import { CheckBox } from '@material-ui/icons'
import { withStyles } from '@material-ui/core/styles';

const useStyles = theme => ({
	input:{
		minWidth: '50%',
		paddingBottom: '1%'
	},
});

class SecAddLunch extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			users: [],
			selectedUser: [],
			date: new Date(),
			lunchedDays: [],
		};
		this.onChangeUser = this.onChangeUser.bind(this);
	}

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
			for (var i = 0; i < this.state.lunchedDays.length; i++) {
				const loopDate = this.state.lunchedDays[i];
				if (
					date.getFullYear() === loopDate.date.getFullYear() &&
					date.getMonth() === loopDate.date.getMonth() &&
					date.getDate() === loopDate.date.getDate()
				) {
					deleteLunch(this.state.selectedUser.account.id, loopDate.id).then(
						(value) => {
							if (value) {
								console.log(value);
								if (value.status === 200) {
									let newLunchedDays = this.state.lunchedDays;
									newLunchedDays.splice(i, 1);
									this.setState({ date: date, LunchedDays: newLunchedDays });
								}
							}
						}
					);
					return;
				}
			}
			addLunch(this.state.selectedUser.account.id, date).then((value) => {
				console.log(value);
				if (value.status === 200) {
					let newLunchedDays = this.state.lunchedDays;
					newLunchedDays.push({ id: value.data.id, date: date });
					this.setState({ date: date, lunchedDays: newLunchedDays });
				}
			});
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
						return <><br /><CheckBox /></>;
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
						<Typography variant="h2" component="h1" gutterBottom>Lunch toevoegen</Typography>
						<FormControl className={classes.input} variant="outlined" >
							<InputLabel>Medewerker</InputLabel>
							<Select
								onChange={this.onChangeUser}
							>
								{this.state.users.map((user, i) => {
									return (
										<MenuItem value={user.account.id} key={i}>{user.account.name + " " + user.account.lastName}</MenuItem>
									);
								})}
							</Select>
						</FormControl>
						<br/>

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
						</Grid>
						<Typography variant="subtitle1" gutterBottom>Klik op een datum om aan te geven of je hebt meegeluncht</Typography>
					</div>
				</div>
			</div>
		);
	}
}

export default withStyles(useStyles)(SecAddLunch)
