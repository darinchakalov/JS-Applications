import { del, get, post, put } from "../api/requester.js";

async function getAllAlbums() {
	return await get("/data/albums?sortBy=_createdOn%20desc&distinct=name");
}

async function getSingleAlbum(id) {
	return await get(`/data/albums/${id}`);
}

async function createAlbum(data) {
	return await post("/data/albums", data);
}

async function deleteAlbum(id) {
	return await del(`/data/albums/${id}`);
}

async function editAlbum(id, data) {
	return put(`/data/albums/${id}`, data);
}

async function searchAlbums(query) {
	return get(`/data/albums?where=name%20LIKE%20%22${query}%22`);
}

export default {
	getAllAlbums,
	createAlbum,
	getSingleAlbum,
	deleteAlbum,
	editAlbum,
	searchAlbums,
};
