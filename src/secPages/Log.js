import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar/navbar";
import Table from "react-bootstrap/Table";
import { getAllLogs } from "../service/logService";

export default class Log extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			logs: [],
		};
	}

	componentDidMount() {
		getAllLogs().then((value) => {
			this.setState({
				logs: value.data,
			});
		});
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
							{logs.map((item) => (
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
				</div>
			</div>
		);
	}
}
