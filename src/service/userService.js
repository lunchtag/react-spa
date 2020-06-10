import Axios from "axios";
import { server } from "./constants.js";
import Auth from "./auth";

export async function getAllUserWithLunches() {
	return Axios.get(`${server}/account/alluserlunches`, {
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

export async function login(credentials) {
	return Axios.post(`${server}/auth/login`, credentials, {
		headers: {
			"Content-Type": "application/json",
		},
	})
		.then((res) => {
			Auth.login(res.data);
			return res;
		})
		.catch((error) => {
			console.log(error);
			return error;
		});
}

export async function createUser(email, firstname, lastname) {
	const dto = JSON.stringify({
		email: email,
		password: "test",
		firstName: firstname,
		lastName: lastname,
	});

	return Axios.post(`${server}/auth/register`, dto, {
		headers: {
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

export async function pinLoginCall(pin, email) {
	return Axios.post(`${server}/auth/pincode`, {
		email: email,
		pincode: pin,
	})
		.then((res) => {
			return res;
		})
		.catch((error) => {
			console.log(error);
			return error.response;
		});
}

export async function getAllUsers() {
	return Axios.get(`${server}/account/all`)
		.then((res) => {
			return res;
		})
		.catch((error) => {
			return error.response;
		});
}

export async function resetPincode() {
	return Axios({
		method: "PUT",
		url: `${server}/auth/updatePin`,
		headers: {
			Authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
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
