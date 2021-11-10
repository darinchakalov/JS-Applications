import { isAuthorized } from "../authentication.js";
import { requester } from "../helpers/requester.js";

const baseUrl = "http://localhost:3030";

const endpoints = {
	allIdeas_url: "/data/ideas?select=_id%2Ctitle%2Cimg&sortBy=_createdOn%20desc",
	ideas_url: "/data/ideas/",
};

export async function getAllIdeas() {
	let url = baseUrl + endpoints.allIdeas_url;
	let data = await requester(url);
	return data;
}

export async function getIdea(id) {
	let url = baseUrl + endpoints.ideas_url + id;
	let data = await requester(url);
	return data;
}

export async function deleteIdea(id) {
	let url = baseUrl + endpoints.ideas_url + id;
	let data = await requester(url, 'Delete', undefined, isAuthorized())
	return data;
}

export async function createIdea(idea) {
	let url = baseUrl + endpoints.ideas_url;
	let data = await requester(url, "POST", idea, isAuthorized());
	return data;
}
