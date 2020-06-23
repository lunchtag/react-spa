import React from "react";
import Navbar from "../../components/navbar/navbar";

import Pagination from '@material-ui/lab/Pagination';
import { getAllLogs } from "../../service/logService";
import "../../css/log.css";
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { Typography, Paper } from "@material-ui/core"
import { withTranslation } from 'react-i18next';
import { Person, AccessTime } from '@material-ui/icons'


const useStyles = (theme) => ({
	tableContainer: {
		marginRight: "auto",
		marginLeft: "auto",
		width: "80%",
	},
	table: {
		minWidth: 650,
	},
	head: {
		backgroundColor: "#3f51b5",
		color: "white",
		fontSize: 14,
	},
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
			this.setState({logs: this.state.logs.sort(function (a, b) {
				return new Date(b.dateOfLog) - new Date(a.dateOfLog);
			})})
			this.setState({count: Math.ceil(this.state.logs.length / this.state.logsPerPage)})
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
			this.setState({logs: this.state.logs.sort(function (a, b) {
				return new Date(a.dateOfLog) - new Date(b.dateOfLog);
			}), sort: true})
		} else {
			this.setState({logs: this.state.logs.sort(function (a, b) {
				return new Date(b.dateOfLog) - new Date(a.dateOfLog);
			}), sort: false})
		}
		this.makeSubArray();
	}

	render() {
		const { classes, t } = this.props;
		return (
			<div className="flexboxes">
				<Navbar />
				<div className="rightpanel">
					<Typography variant="h2" component="h1" gutterBottom>
						Audit logs
						</Typography>
					<Paper className={classes.tableContainer} elevation={3}>
						<Table className={classes.table} aria-label="simple table">
							<TableHead>
								<TableRow>
									<TableCell className={classes.head}><Person/></TableCell>
									<TableCell className={classes.head} align="right" ><AccessTime onClick={this.sortByDate}/></TableCell>
									<TableCell className={classes.head} align="right">{t("Omschrijving")}</TableCell>
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

					</Paper>
					<Pagination onChange={this.handleChange} className="pagination" count={this.state.count} />
				</div>
			</div>
		);
	}
}

export default withTranslation() (withStyles(useStyles)(Log));
