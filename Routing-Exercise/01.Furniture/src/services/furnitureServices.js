import { del, get, post, put } from "../helpers/dataGenerator.js";

export async function getAllFurniture() {
	let response = await get("/data/catalog");
	return response;
}

export async function getSingleFurniture(id) {
	let response = await get(`/data/catalog/${id}`);
	return response;
}

export async function deleteFurniture(id) {
	let response = await del(`/data/catalog/${id}`);
	return response;
}

export async function createFurniture(furniture) {
	let response = await post("/data/catalog", furniture);
	return response;
}

export async function editFurniture(id, furniture) {
	let response = await put(`/data/catalog/${id}`, furniture);
	return response;
}

export async function getMyFurniture(userId) {
	let response = await get(`/data/catalog?where=_ownerId%3D%22${userId}%22`)
	return response;
}