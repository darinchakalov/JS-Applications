import { get, post, del, put } from "../api/requester.js";

async function getAll() {
	let allMemes = await get("/data/memes?sortBy=_createdOn%20desc");
	return allMemes;
}

async function getSingleMeme(id) {
	let currentMeme = await get(`/data/memes/${id}`);
	return currentMeme;
}

async function create(meme) {
	let createdMeme = await post("/data/memes", meme);
	return createdMeme;
}

async function deleteMeme(id) {
	let deletedMeme = await del(`/data/memes/${id}`);
	return deletedMeme;
}

async function editMeme(id, meme) {
	let editedMeme = await put(`/data/memes/${id}`, meme);
	return editedMeme;
}

async function getUserMemes(id) {
	let userMemes = await get(`/data/memes?where=_ownerId%3D%22${id}%22&sortBy=_createdOn%20desc`);
	return userMemes;
}

export default {
	getAll,
	create,
	getSingleMeme,
	deleteMeme,
	editMeme,
    getUserMemes
};
