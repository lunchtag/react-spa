import Axios from "axios";
import { server } from "./constants.js";

export async function deleteLunchId(lunchId) {
	const url = "https://lunchtag-resource-server.herokuapp.com/lunch/" + lunchId;
	return fetch(url, {
		method: "DELETE",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: "Bearer " + window.sessionStorage.getItem("token"),
		},
	})
		.then((res) => {
			return res;
		})
		.catch((error) => {
			console.log(error);
			return error;
		});
}

export async function getAllLunchesForUser() {
	return Axios.get(`${server}/lunch`, {
		headers: {
			Authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
			"Content-Type": "application/json",
		},
	})
		.then((res) => {
			return res;
		})
		.catch((error) => {
			console.log(error);
			return error.response;
		});
}

export async function getAllLunchesFromUser(selectedUser) {
	const url =
		"https://lunchtag-resource-server.herokuapp.com/lunch/account/" +
		selectedUser.id;

	return fetch(url, {
		method: "GET",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: "Bearer " + window.sessionStorage.getItem("token"),
		},
	})
		.then((res) => res.json())
		.then((data) => {
			return data;
		})
		.catch((error) => {
			return "empty";
		});
}

export async function addLunch(lunchDate) {
	lunchDate.setHours(3);
	return Axios.post(
		`${server}/lunch`,
		{
			date: lunchDate.toISOString(),
		},
		{
			headers: {
				Authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
				"Content-Type": "application/json",
			},
		}
	)
		.then((res) => {
			return res;
		})
		.catch((error) => {
			console.log(error);
			return error.response;
		});
}

export async function addLunch2(data) {
	return Axios.post(`${server}/lunch`, data, {
		headers: {
			Authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
			"Content-Type": "application/json",
		},
	})
		.then((res) => {
			return res;
		})
		.catch((error) => {
			console.log(error);
			return error.response;
		});
}

export async function deleteLunch(lunchId) {
	// const token = auth.parseJwt(window.sessionStorage.getItem("token"))
	return Axios.delete(`${server}/lunch/${lunchId}`, {
		headers: {
			Authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
		},
	})
		.then((res) => {
			return res;
		})
		.catch((error) => {
			console.log(error);
			return null;
		});
}

export async function exportPdf(year, month) {
	return Axios.get(`${server}/lunch/export/${year}/${month}`, {
		responseType: "arraybuffer",

		headers: {
			Authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
			"Content-Type": "application/json",
			Accept: "application/pdf",
		},
	}).then((res) => {
		return res;
	});
}
