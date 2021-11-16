import { get, post } from "../helpers/dataGenerator.js";

function getAuthToken() {
	return sessionStorage.getItem("authToken");
}

function getUserName() {
	return sessionStorage.getItem("username");
}

function getUserId() {
	return sessionStorage.getItem("userId");
}

function isLoggedIn() {
	return sessionStorage.getItem("authToken") !== null;
}

async function login(user) {
    let result = await post('/users/login', user)
    setAuthenticationData(result)
}

async function register(user){
    let result = await post('/users/register', user)
    setAuthenticationData(result)
}

function setAuthenticationData(result) {
    sessionStorage.setItem('authToken', result.accessToken);
    sessionStorage.setItem('username', result.email);
    sessionStorage.setItem('userId', result._id);
}

async function logout() {
    let result = await get('/users/logout');
    if (result !== undefined) {
        sessionStorage.clear()
    }
}


export default {
    getAuthToken,
    getUserName,
    getUserId,
    isLoggedIn,
    login,
    register,
    logout
}