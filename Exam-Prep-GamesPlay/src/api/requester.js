const host = "http://localhost:3030";

async function request(uri, options) {
	try {
		const response = await fetch(host + uri, options);
		if (response.ok !== true) {
			if (response.status === 403) {
				sessionStorage.clear();
			}
			const error = await response.json();
			throw new Error(error.message);
		}

		if (response.status === 204) {
			return response;
		} else {
			if (response.url === "http://localhost:3030/data/comments") {
				return response
			} else {
				return response.json();
			}
		}
	} catch (err) {
		alert(err.message);
		throw err;
	}
}

function createOptions(method = "get", data) {
	const options = {
		method,
		headers: {},
	};

	if (data !== undefined) {
		options.headers["Content-Type"] = "application/json";
		options.body = JSON.stringify(data);
	}

	const token = sessionStorage.getItem("authToken");
	if (token !== null) {
		options.headers["X-Authorization"] = token;
	}
	return options;
}

export async function get(url){
    return request(url, createOptions());
}

export async function post(url, data){
    return request (url, createOptions('post', data));
}

export async function put(url, data){
    return request(url, createOptions('put', data));
}

export async function del(url){
    return request(url, createOptions('delete'));
}