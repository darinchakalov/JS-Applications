import dataGenerator from "./dataGenerator.js";
import authentication from "../handlers/authentication.js";

export default async function registrationCall(regData) {
	
	if (regData.get("password") !== regData.get("repeatPassword")) {
        return alert('Password should match')
	}

	const body = {
		email: regData.get("email"),
		password: regData.get("password"),
	};

    const response = await dataGenerator.post('/users/register', body)
    authentication.setAuthenticationData(response)
	return response;
}
 