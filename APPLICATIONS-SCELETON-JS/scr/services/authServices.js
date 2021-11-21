import { get, post } from "../api/requester.js";

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
	//set username if needed as well
	sessionStorage.setItem("authToken", data.accessToken);
	sessionStorage.setItem("username", data.email);
	sessionStorage.setItem("userId", data._id);
}

export default {
	login,
	register,
	logout,
};
