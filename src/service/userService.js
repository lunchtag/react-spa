import Axios from "axios";
import { server } from "./constants.js";

export async function getAllUserWithLunches() {
	return Axios.get(`${server}/account/alluserlunches`, {
		headers: {
			Authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
			"Content-Type": "application/json",
		},
	})
		.then((res) => {
			console.log(res);
			return res;
		})
		.catch((error) => {
			console.log(error);
			return error.response;
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
			console.log(res);
			return res;
		})
		.catch((error) => {
			console.log(error);
			return error.response;
		});
}
