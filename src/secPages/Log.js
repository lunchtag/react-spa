import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar/navbar";
import Table from "react-bootstrap/Table";

import Pagination from '@material-ui/lab/Pagination';
import { getAllLogs } from "../service/logService";
import "../css/log.css";



export default class Log extends React.Component {
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
		this.state.currentPage = value;
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

		return (
			<div className="flexboxes">
				<Navbar />
				<div className="rightpanel">
					<h1>Audit logs</h1>

					<Table striped bordered hover>
						<thead>
							<tr>
								<th>User</th>
								<th>Tijd gemaakt</th>
								<th>Log omschrijving</th>
							</tr>
						</thead>
						<tbody>

							{this.state.subLogs.map((item) => (
								<tr>
									<td>{item.user.name + " " + item.user.lastName}</td>

									<td>
										{new Date(item.dateOfLog).toLocaleDateString() +
											" " +
											new Date(item.dateOfLog).toLocaleTimeString()}
									</td>

									<td>{item.logText}</td>
								</tr>
							))}
						</tbody>
					</Table>
					<Pagination onChange={this.handleChange} className="pagination" count={this.state.count} />
				</div>
			</div>
		);
	}
}
