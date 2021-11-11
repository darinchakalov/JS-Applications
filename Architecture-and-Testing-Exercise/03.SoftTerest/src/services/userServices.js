import { get, post } from "../helpers/dataGenerator.js";
import { requester } from "../helpers/requester.js";

async function loginRequest(loginData) {
	const uri = '/users/login';
	let request = post(uri, loginData)
	return await request;
}

async function registerRequest(registerData) {
	const uri = '/users/register';
	let request = post(uri, registerData)
	return await request;
}

async function logoutRequest() {
	const uri = '/users/logout';
    let request = get(uri)
	return await request;
}

let userServices = {
	loginRequest,
	registerRequest,
	logoutRequest,
};

export default userServices;
