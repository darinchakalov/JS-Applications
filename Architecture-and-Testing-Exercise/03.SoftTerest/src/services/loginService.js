import dataGenerator from "./dataGenerator.js";
import authentication from "../handlers/authentication.js";

export default async function loginCall(loginData) {
	const body = {
		email: loginData.get("email"),
		password: loginData.get("password"),
	};

    const response = await dataGenerator.post('/users/login', body)
    authentication.setAuthenticationData(response)
	return response;
}
