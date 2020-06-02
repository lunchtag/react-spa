import Axios from "axios";
import { server } from "./constants.js";

export async function getAllLunchesForUser() {
	return Axios.get(`${server}/lunch/`, {
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

export async function addLunch(accountId, lunchDate) {
	lunchDate.setHours(3);

	return Axios({
		method: "POST",
		url: `${server}/admin/lunch/${accountId}`,
		data: {
			date: lunchDate.toISOString(),
		},

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

export async function deleteLunch(accountId, lunchId) {
	return Axios({
		method: "DELETE",
		url: `${server}/admin/lunch/${accountId}/${lunchId}`,

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
