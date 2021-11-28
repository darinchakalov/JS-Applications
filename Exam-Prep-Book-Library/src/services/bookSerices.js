import { del, get, post, put } from "../api/requester.js";

async function getAllBooks() {
	let getBooksRequest = await get("/data/books?sortBy=_createdOn%20desc");
	return getBooksRequest;
}

async function getSingleBook(id) {
	let getBookRequest = await get(`/data/books/${id}`);
	return getBookRequest;
}

async function createBook(data) {
	let createBookRequest = await post("/data/books", data);
	return createBookRequest;
}

async function editBook(id, data) {
	let editedBook = await put(`/data/books/${id}`, data);
	return editedBook;
}

async function deleteBook(id) {
	let deletedBook = await del(`/data/books/${id}`);
	return deletedBook;
}

async function getUserBooks() {
	let getBooksRequest = await get(
		`/data/books?where=_ownerId%3D%22${sessionStorage.getItem("userId")}%22&sortBy=_createdOn%20desc`
	);
	return getBooksRequest;
}

async function makeLike(id) {
	let likedBook = await post(`/data/likes`, id);
	return likedBook;
}

async function getLikes(id) {
	let getLikesRequest = await get(`/data/likes?where=bookId%3D%22${id}%22&distinct=_ownerId&count`);
	return getLikesRequest;
}

async function isLiked(bookId, userId) {
	let isLikedRequest = await get(`/data/likes?where=bookId%3D%22${bookId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
	return isLikedRequest;
}

export default {
	getAllBooks,
	getSingleBook,
	createBook,
	editBook,
	deleteBook,
	getUserBooks,
	makeLike,
	getLikes,
	isLiked
};
