import Axios from "axios";
import { server } from "./constants.js";

export async function getAllLogs() {
	return Axios.get(`${server}/log`, {
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
