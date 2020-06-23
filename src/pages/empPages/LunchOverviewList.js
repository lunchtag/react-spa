import React, { Component } from "react";

import "react-moment";
import dateHelper from "../../service/dateHelper";
import Navbar from "../../components/navbar/navbar";

import LunchItem from "../../components/LunchItem";

import {
	Container,
	Button,
	Typography,
	Paper,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	ButtonGroup,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { Person, Today, ArrowBack, ArrowForward } from "@material-ui/icons";

import { getAllLunchesForUser } from "../../service/lunchService";

import "../../css/LunchOverview.css";
import moment from "moment";
import { withStyles } from "@material-ui/core/styles";
import SnackbarMessage from "../../components/SnackbarMessage";

import { withTranslation } from 'react-i18next';

const StyledTableCell = withStyles((theme) => ({
	head: {
		backgroundColor: theme.palette.primary.main,
		color: theme.palette.common.white,
	},
	body: {
		fontSize: 14,
	},
}))(TableCell);

const useStyles = (theme) => ({
	buttonGroup: {
		paddingBottom: "1%",
	},
	table: {},
});

class LunchOverviewList extends Component {
	constructor(props) {
		super(props);

		this.state = {
			lunches: [],
			filteredLunches: [],

			filterValue: "month",
			currentMonth: new Date().getMonth(),
			currentWeek: 0,
			currentWeekNr: dateHelper.getWeek(Date()),

			showMessage: false,
			message: "",
		};
	}

	componentDidMount() {
		getAllLunchesForUser().then((data) => {
			if (data.data !== "No Lunches were found") {
				this.setState({
					lunches: data.data,
					filteredLunches: data.data,
				});
				this.filterLunches();
			}
		});
	}

	filterLunches() {
		if (this.state.filterValue === "month") {
			this.setState({
				filteredLunches: this.state.lunches.filter((item) => {
					return new Date(item.date).getMonth() === this.state.currentMonth;
				}),
			});

			return;
		}

		var beginWeek = moment()
			.startOf("week")
			.add(1, "day")
			.subtract(this.state.currentWeek, "week")._d;
		var endWeek = moment()
			.startOf("week")
			.subtract(this.state.currentWeek - 1, "week")._d;

		if (this.state.filterValue === "week") {
			this.setState({
				filteredLunches: this.state.lunches.filter((item) => {
					return (
						new Date(item.date) >= beginWeek && new Date(item.date) <= endWeek
					);
				}),
			});
		}
	}

	closeMessage = (e) => {
		this.setState({
			showMessage: false,
		});
	};

	render() {
		const { classes, t } = this.props;

		const {
			filteredLunches,
			currentMonth,
			currentWeek,
			currentWeekNr,
			filterValue,
		} = this.state;

		const setFilterValue = (newFilterValue) => {
			this.setState({
				currentMonth: new Date().getMonth(),
				startWeek: moment().startOf("day").subtract(1, "week")._d,
				endWeek: new Date(),
				filterValue: newFilterValue,
			});

			filterByCurrent();
		};

		const filterByCurrent = () => {
			this.setState(
				{
					currentMonth: new Date().getMonth(),
					currentWeek: 0,
					currentWeekNr: dateHelper.getWeek(Date()),
				},
				() => {
					this.filterLunches();
				}
			);
		};

		const filterByNext = () => {
			if (this.state.currentMonth < 11) {
				this.setState({ currentMonth: currentMonth + 1 });
			}

			if (this.state.currentWeekNr < 52) {
				this.setState({ currentWeekNr: currentWeekNr + 1 });
			}

			this.setState({ currentWeek: currentWeek - 1 }, () => {
				this.filterLunches();
			});
		};

		const filterByPrevious = () => {
			if (this.state.currentMonth > 0) {
				this.setState({ currentMonth: currentMonth - 1 }, () => {
					this.filterLunches();
				});
			}

			if (this.state.currentWeekNr > 1) {
				this.setState({ currentWeekNr: currentWeekNr - 1 });
			}

			this.setState({ currentWeek: currentWeek + 1 }, () => {
				this.filterLunches();
			});
		};

		const deleteLunch = (lunchId, messageType) => {
			if (messageType === "success") {
				this.setState({
					showMessage: true,
					messageType: "success",
					message: t("Lunch succesvol verwijderd"),
				});
			} else {
				this.setState({
					showMessage: true,
					messageType: "warning",
					message: t("Er is iets mis gegaan"),
				});
			}

			const newLunches = this.state.lunches.filter(
				(lunch) => lunch.id !== lunchId
			);
			this.setState({ lunches: newLunches, filteredLunches: newLunches });
			this.filterLunches();
		};

		return (
			<div className="flexboxes">
				<Navbar />
				<div className="rightpanel">
					<React.Fragment>
						<div>
							<Container maxWidth="lg">
								<Typography variant="h2" component="h1" gutterBottom>
									{t("Overzicht")}
								</Typography>
								{this.state.filterValue === "month" ? (
									<Typography variant="h4" component="h1" gutterBottom>
										{t("Maand") + " " + dateHelper.getMonthFromNumber(this.state.currentMonth)}
									</Typography>
								) : (
									<Typography variant="h4" component="h1" gutterBottom>
										{t("Week") + " " + this.state.currentWeekNr}
									</Typography>
								)}

								<ButtonGroup className={classes.buttonGroup} fullWidth>
									{this.state.filterValue === "week" ? (
										<>
											<Button
												fullWidth
												variant="contained"
												color="secondary"
												value="week"
												onClick={() => {
													setFilterValue("week");
												}}
											>
												Week
											</Button>
											<Button
												fullWidth
												variant="contained"
												value="month"
												onClick={() => {
													setFilterValue("month");
												}}
											>
												{t("Maand")}
											</Button>
										</>
									) : (
										<>
											<Button
												fullWidth
												variant="contained"
												value="week"
												onClick={() => {
													setFilterValue("week");
												}}
											>
												Week
											</Button>
											<Button
												fullWidth
												variant="contained"
												color="secondary"
												value="month"
												onClick={() => {
													setFilterValue("month");
												}}
											>
												{t("Maand")}
											</Button>
										</>
									)}
								</ButtonGroup>

								<ButtonGroup
									className={classes.buttonGroup}
									fullWidth
									color="primary"
									aria-label="outlined primary button group"
								>
									<Button
										onClick={() => {
											filterByPrevious();
										}}
									>
										<ArrowBack />
									</Button>
									<Button
										onClick={() => {
											filterByCurrent();
										}}
									>
										{t("Vandaag")}
									</Button>
									<Button
										onClick={() => {
											filterByNext();
										}}
									>
										<ArrowForward />
									</Button>
								</ButtonGroup>

								<Paper elevation={3}>
									<Table className={classes.table}>
										<TableHead>
											<TableRow>
												<StyledTableCell align="left">
													<Person />
												</StyledTableCell>
												<StyledTableCell align="center">
													<Today />
												</StyledTableCell>
												<StyledTableCell align="right"></StyledTableCell>
											</TableRow>
										</TableHead>
										<TableBody>
											{filteredLunches.map((item) => (
												<LunchItem
													callback={(messageType) =>
														deleteLunch(item.id, messageType)
													}
													key={item.id}
													lunch={item}
												/>
											))}
										</TableBody>
									</Table>
								</Paper>
								{filteredLunches.length === 0 && filterValue === "month" && (
									<Alert variant="outlined" severity="info">
										Er zijn geen lunches deze maand
									</Alert>
								)}
								{filteredLunches.length === 0 && filterValue === "week" && (
									<Alert variant="outlined" severity="info">
										Er zijn geen lunches deze week
									</Alert>
								)}
							</Container>
						</div>
					</React.Fragment>

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

export default withTranslation() (withStyles(useStyles)(LunchOverviewList));
