import React from "react";
import Navbar from "../../components/navbar/navbar";

import Pagination from '@material-ui/lab/Pagination';
import { getAllLogs } from "../../service/logService";
import "../../css/log.css";
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Container } from "@material-ui/core"
import DateRange from "@material-ui/icons/DateRange";

const useStyles = makeStyles({
	table: {
		minWidth: 650,
	}
});
class Log extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			logs: [],
			subLogs: [],
			currentPage: 1,
			logsPerPage: 10,
			count: 5,
			sort: false
		};
	}

	componentDidMount() {
		getAllLogs().then((value) => {
			this.setState({
				logs: value.data,
			});
			this.state.logs = this.state.logs.sort(function (a, b) {
				return new Date(b.dateOfLog) - new Date(a.dateOfLog);
			});
			this.state.count = Math.ceil(this.state.logs.length / this.state.logsPerPage);
			this.makeSubArray();
		});
	}

	handleChange = (event, value) => {
		this.setState({ currentPage: value });
		this.makeSubArray();
	}

	makeSubArray = () => {
		let endIndex = this.state.currentPage * this.state.logsPerPage;
		let startfromIndex = endIndex - this.state.logsPerPage;
		// slice array
		this.setState({
			subLogs: this.state.logs.slice(startfromIndex, endIndex)
		})


	}

	sortByDate = () => {
		let sort = this.state.sort;
		if (!sort) {
			this.state.logs = this.state.logs.sort(function (a, b) {
				return new Date(a.dateOfLog) - new Date(b.dateOfLog);
			});
			this.setState({
				sort: true
			})
		} else {
			this.state.logs = this.state.logs.sort(function (a, b) {
				return new Date(b.dateOfLog) - new Date(a.dateOfLog);
			});
			this.setState({
				sort: false
			})
		}
		this.makeSubArray();
	}

	render() {
		const { classes } = this.props;
		return (
			<div className="flexboxes">
				<Navbar />
				<div className="rightpanel">
					<h1>Audit logs</h1>
					<Container maxWidth="md">
						<Table className={classes.table} aria-label="simple table">
							<TableHead>
								<TableRow>
									<TableCell>User</TableCell>
									<TableCell align="right" >Tijd gemaakt <DateRange onClick={this.sortByDate} className="sort" /></TableCell>
									<TableCell align="right">Log omschrijving</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{this.state.subLogs.map((row) => (
									<TableRow key={row.id}>
										<TableCell component="th" scope="row">
											{row.user.name}
										</TableCell>
										<TableCell align="right">{new Date(row.dateOfLog).toLocaleDateString() +
											" " +
											new Date(row.dateOfLog).toLocaleTimeString()}</TableCell>
										<TableCell align="right">{row.logText}</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</Container>
					<Pagination onChange={this.handleChange} className="pagination" count={this.state.count} />
				</div>
			</div>
		);
	}
}

export default withStyles(useStyles)(Log);
