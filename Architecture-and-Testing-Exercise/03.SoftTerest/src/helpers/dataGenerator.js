import { requester } from "./requester.js";

export async function get(url) {
	return requester(url, createOptions());
}

export async function post(url, data) {
	return requester(url, createOptions("POST", data));
}

export async function del(url) {
	return requester(url, createOptions("delete"));
}

function createOptions(method = "GET", data) {
	let result = {
		method,
        headers: {}
	};

	if (data) {
		(result.headers["Content-Type"] = "application/json"), (result["body"] = JSON.stringify(data));
	}

	const token = sessionStorage.getItem("authToken");
	if (token) {
		result.headers["X-Authorization"] = token;
	}

	return result;
}
