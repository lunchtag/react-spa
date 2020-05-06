class Auth {
	login(data) {
		this.logout();
		console.log(this.parseJwt(data.token));

		window.sessionStorage.setItem("token", data.token);
		window.sessionStorage.setItem("role", data.user.role);
		console.log(data.user);
		window.sessionStorage.setItem(
			"name",
			data.user.name + " " + data.user.lastName
		);
	}

	logout() {
		window.sessionStorage.removeItem("token");
		window.sessionStorage.removeItem("role");
	}

	parseJwt(token) {
		var base64Url = token.split(".")[1];
		var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
		var jsonPayload = decodeURIComponent(
			atob(base64)
				.split("")
				.map(function (c) {
					return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
				})
				.join("")
		);

		return JSON.parse(jsonPayload);
	}
}

export default new Auth();
