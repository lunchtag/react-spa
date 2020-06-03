import React from "react";
import Calander from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../css/Calendar.css";
import {
	getAllLunchesForUser,
	addLunch,
	deleteLunch,
} from "../service/lunchService";
import Navbar from "../components/navbar/navbar";
import {Typography, Paper, Grid, Container } from "@material-ui/core";
import {Alert } from "@material-ui/lab"
import { CheckBox } from '@material-ui/icons'
import { withStyles } from '@material-ui/core/styles';

const useStyles = theme => ({

});

class UserLunchOverView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			date: new Date(),
			lunchedDays: [],
		};
	}

	componentDidMount() {
		getAllLunchesForUser().then((value) => {
			if (value.status === 200) {
				const dates = [];
				value.data.forEach((element) => {
					const res = element.date.split("T", 1);
					dates.push({ id: element.id, date: new Date(res) });
				});
				this.setState({
					lunchedDays: dates,
				});
			}
		});
	}

	render() {
		const onChange = (date) => {
			for (let i = 0; i < this.state.lunchedDays.length; i++) {
				const loopDate = this.state.lunchedDays[i];
				if (
					date.getFullYear() === loopDate.date.getFullYear() &&
					date.getMonth() === loopDate.date.getMonth() &&
					date.getDate() === loopDate.date.getDate()
				) {
					deleteLunch(loopDate.id).then((value) => {
						if (value) {
							console.log(value);
							if (value.status === 200) {
								let newLunchedDays = this.state.lunchedDays;
								newLunchedDays.splice(i, 1);
								this.setState({ date: date, LunchedDays: newLunchedDays });
							}
						}
					});
					return;
				}
			}
			addLunch(date).then((value) => {
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
						return <><br /><CheckBox /></>
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
						<Typography variant="h2" component="h1" gutterBottom>Maand overzicht</Typography>
						<Container maxWidth="lg" justify="center">
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
							<br/>
							<Alert severity="info">Klik op een datum om aan te geven of je hebt meegeluncht</Alert>
						</Container>						
					</div>
				</div>
			</div>
		);
	}
}

export default withStyles(useStyles)(UserLunchOverView)
