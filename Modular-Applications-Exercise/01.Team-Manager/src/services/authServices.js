import { get, post } from "../helpers/dataGenerator.js";

function isLoggedIn() {
	return sessionStorage.getItem("authToken") !== null ? true : false;
}

async function login(user) {
	let result = await post('/users/login', user)
	if (result.code && result.code !== 200) {
		alert(`${result.code} ${result.message}`)
		return
	} else {
		setAuthenticationData(result)
		return result;
	}
}

async function register(user) {
	let result = await post('/users/register', user)
	console.log(result);
	if (result.code && result.code !== 200) {
		alert(`${result.code} ${result.message}`)
		return
	} else {
		setAuthenticationData(result)
		return result;
	}
}

async function logout() {
	let result = await get('/users/logout');
    if (result !== undefined) {
        sessionStorage.clear()
    }
}

function setAuthenticationData(result) {
	sessionStorage.setItem('authToken', result.accessToken);
    sessionStorage.setItem('username', result.email);
    sessionStorage.setItem('userId', result._id);
}

export default {
	isLoggedIn,
	login,
	register,
	logout
};
