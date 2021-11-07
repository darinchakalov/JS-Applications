import dataGenerator from "../services/dataGenerator.js";

function setMenu() {
	if (getToken()) {
		[...document.querySelectorAll(".user-nav")].forEach((e) => (e.style.display = "list-item"));
		[...document.querySelectorAll(".guest-nav")].forEach((e) => (e.style.display = "none"));
	} else {
		[...document.querySelectorAll(".user-nav")].forEach((e) => (e.style.display = "none"));
		[...document.querySelectorAll(".guest-nav")].forEach((e) => (e.style.display = "list-item"));
	}
}

async function onLogout() {
	let response = await dataGenerator.get("/users/logout");
	if (response.status === 204) {
		removeAuthenticationData();
		setMenu();
	}
}

function getToken() {
	const token = sessionStorage.getItem("authToken");
	return token;
}

function setAuthenticationData(response) {
	sessionStorage.setItem("authToken", response.accessToken);
	setMenu();
}

function removeAuthenticationData() {
	sessionStorage.removeItem("authToken");
}

export default {
	setMenu,
	getToken,
	setAuthenticationData,
	onLogout,
};
