import React  from "react";
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
import {Container, Typography} from "@material-ui/core"
import { Person, Event, Description } from "@material-ui/icons"

const StyledTableCell = withStyles((theme) => ({
	head: {
		backgroundColor: theme.palette.primary.main,
		color: theme.palette.common.white,
		fontSize: 20,
	},
	body: {
		fontSize: 14,
	},
}))(TableCell);

const useStyles = makeStyles({
	table: {
	  minWidth: 650,
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
			count: 5
		};
	}

	componentDidMount() {
		getAllLogs().then((value) => {
			this.setState({
				logs: value.data,
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

	render() {
		const logs = this.state.logs;
		const { classes } = this.props;
		return (
			<div className="flexboxes">
				<Navbar />
				<div className="rightpanel">
				<Typography variant="h2" component="h1" gutterBottom>
				Audit logs
						</Typography>
					<Container maxWidth="md">
						<Table className={classes.table} aria-label="simple table">
							<TableHead>
								<TableRow>
									<StyledTableCell align="left"><Person/></StyledTableCell>
									<StyledTableCell align="right"><Event/></StyledTableCell>
									<StyledTableCell align="right"><Description/></StyledTableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{this.state.subLogs.map((row) => (
									<TableRow key={row.name}>
										<TableCell component="th" scope="row">
											{row.user.name + " " + row.user.lastName}
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
