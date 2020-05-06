import React from "react";
import Calander from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../css/Calendar.css";
import Navbar from "../components/navbar/navbar";
import { getAllUserWithLunches } from "../service/userService";
import { addLunch, deleteLunch } from "../service/secLunchService";

export default class SecAddLunch extends React.Component {
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
						return <p className="pcOnly">Lunched</p>;
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
				<div className="leftpanel">
					<Navbar />
				</div>
				<div className="rightpanel">
					<div className="content">
						<div className="headline">
							<h1>Lunch toevoegen</h1>
						</div>
						<div>
							<h2>Selecteer medewerker</h2>

							<select onChange={this.onChangeUser}>
								{this.state.users.map((user, i) => {
									return (
										<option key={i} value={user.account.id}>
											{user.account.name + " " + user.account.lastName}
										</option>
									);
								})}
							</select>
						</div>
						<div className="monthlyLunchOverView">
							<div className="calendar">
								<Calander
									onChange={onChange}
									value={date}
									showWeekNumbers
									maxDate={new Date()}
									onClickDay={this.onClickDay}
									tileContent={tileContent}
									tileClassName={tileClassName}
								/>
							</div>
						</div>
						<div className="tip">
							<p>Klik op een datum om aan te geven of je hebt meegeluncht</p>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
