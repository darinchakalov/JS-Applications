import { get, post } from "../api/requester.js";

function isLoggedIn() {
	return sessionStorage.getItem('authToken') !== null;
}

async function login(userData) {
	let response = await post("/users/login", userData);
	setUserData(response);
}

async function register(userData) {
	let response = await post("/users/register", userData);
	setUserData(response);
}

async function logout() {
	let response = await get("/users/logout");
	if (response !== undefined) {
		sessionStorage.clear();
	}
}

function setUserData(data) {
	sessionStorage.setItem("authToken", data.accessToken);
	sessionStorage.setItem("username", data.username);
	sessionStorage.setItem("userId", data._id);
}

export default {
	login,
	register,
	logout,
	isLoggedIn
};
