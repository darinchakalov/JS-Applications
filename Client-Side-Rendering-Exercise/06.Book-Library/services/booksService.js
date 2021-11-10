import { jsonRequest } from "../helpers/jsonRequest.js";

let baseUrl = "http://localhost:3030/jsonstore/collections/books/";

async function getAllBooks() {
	let books = await jsonRequest(baseUrl);
	return books;
}

async function getBook(id) {
	let book = await jsonRequest(baseUrl + id);
	return book;
}
async function createBook(book) {
	let createdBook = await jsonRequest(baseUrl, 'Post', book);
	return createdBook;
}
async function editBook(id, book) {
	let editedBook = await jsonRequest(baseUrl + id, "Put", book);
	return editedBook;
}
async function deleteBook(id) {
	let deletedBook = await jsonRequest(baseUrl + id, "Delete");
	return deletedBook;
}

let booksService = {
	getAllBooks,
	getBook,
	createBook,
	editBook,
	deleteBook,
};

export default booksService;
