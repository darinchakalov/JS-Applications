import { get, post } from "../api/requester.js";

function isLoggedIn() {
	return sessionStorage.getItem("authToken") !== null;
}

async function login(userData) {
	let response = await post("/users/login", userData);
	if (!response.message) {
		setUserData(response);
	}
	return response;
}

async function register(userData) {
	let response = await post("/users/register", userData);
	if (!response.message) {
		setUserData(response);
	}
	return response;
}

async function logout() {
	let response = await get("/users/logout");
	if (response !== undefined) {
		sessionStorage.clear();
		return response;
	}
}

function setUserData(data) {
	sessionStorage.setItem("username", data.username);
	sessionStorage.setItem("authToken", data.accessToken);
	sessionStorage.setItem("email", data.email);
	sessionStorage.setItem("userId", data._id);
	sessionStorage.setItem("gender", data.gender);
}

export default {
	login,
	register,
	logout,
	isLoggedIn,
};
