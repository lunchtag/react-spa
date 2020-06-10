import Axios from "axios";
import { server } from "./constants";

export async function getAllUsers() {
	return Axios.get(`${server}/account/all`, {
		headers: {
			Authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
			"Content-Type": "application/json",
		},
	})
		.then((res) => {
			return res;
		})
		.catch((error) => {
			return error;
		});
}

export async function updateUser(item) {
	return Axios.put(
		`${server}/account/update/${item.id}`,
		{
			firstName: item.name,
			lastName: item.lastName,
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
			return error;
		});
}

export async function updateOwnAccount(item) {
	return Axios.put(
		`${server}/account`,
		{
			firstName: item.firstName,
			lastName: item.lastName,
			password: item.password,
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
			return error;
		});
}

export async function disableById(id) {
	return Axios({
		method: "POST",
		url: `${server}/account/disable/${id}`,
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
			return error;
		});
}
