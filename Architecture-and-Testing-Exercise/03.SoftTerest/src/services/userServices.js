import { isAuthorized } from "../authentication.js";
import { requester } from "../helpers/requester.js";

let baseUrl = "http://localhost:3030";
const endpoints = {
	login_uri: "/users/login/",
	register_uri: "/users/register/",
	logout_uri: "/users/logout",
};

async function loginRequest(loginData) {
	const url = baseUrl + endpoints.login_uri;
	let data = await requester(url, "post", loginData);
	return data;
}

async function registerRequest(registerData) {
	const url = baseUrl + endpoints.register_uri;
	let data = await requester(url, "post", registerData);
	return data;
}

async function logoutRequest() {
	const url = baseUrl + endpoints.logout_uri;
    const token = sessionStorage.getItem("authToken");
	let data = await fetch(url, {
        headers: {
            'X-Authorization': token
        }
    });
    return data
}

let userServices = {
	loginRequest,
	registerRequest,
	logoutRequest,
};

export default userServices;
