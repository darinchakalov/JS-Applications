import { render } from "../node_modules/lit-html/lit-html.js";
import booksService from "./services/booksService.js";
import { bookLibraryTemplate, allBooksTemplate } from "./templates/bookTemplate.js";

let body = document.body;

let addForm = {
	id: "add-form",
	type: "add",
	title: "Add Book",
	submitText: "Submit",
	submitHandler: createBooks,
    class: ''
};

let editForm = {
	id: "edit-form",
	type: "ecit",
	title: "Edit Book",
	submitText: "Save",
	class: "hidden",
	titleValue: "",
	authorValue: "",
    submitHandler: editBooks,
	idValue: "",
};

let forms = [addForm, editForm];
let books = [];

render(bookLibraryTemplate([], forms, loadBooks), body);
document.querySelector('#add-form').reset()

async function loadBooks() {
	const tableBody = document.querySelector("#books-container");
	let booksObj = await booksService.getAllBooks();
	books = Object.entries(booksObj).map(([key, val]) => {
		val._id = key;
		return val;
	});
	render(allBooksTemplate(books, prepareEdit, deleteBook), tableBody);
}

async function createBooks(e) {
	e.preventDefault();
	let form = e.target;
	let formData = new FormData(form);
	let newBook = {
		author: formData.get("author"),
		title: formData.get("title"),
	};

	let createResult = await booksService.createBook(newBook);
	books.push(createResult);
	loadBooks()
    form.reset()
}

async function prepareEdit(e) {
	let book = e.target.closest(".book");
	let id = book.dataset.id;

	let editBook = await booksService.getBook(id);
    editForm.class = undefined
    addForm.class = 'hidden'

	editForm.idValue = id;
	editForm.authorValue = editBook.author;
	editForm.titleValue = editBook.title;
    render(bookLibraryTemplate([], forms), body);
}

async function editBooks(e) {
	e.preventDefault();
	let form = e.target;
    let bookId = editForm.idValue;
	let formData = new FormData(form);
	let editBook = {
		author: formData.get("author"),
		title: formData.get("title"),
	};
    let editedBook = await booksService.editBook(bookId, editBook)

	loadBooks()
    addForm.class = undefined;
    editForm.class = 'hidden'
    render(bookLibraryTemplate([], forms), body);
}

async function deleteBook(e) {
    e.preventDefault()
    let book = e.target.closest(".book");
    let bookId = book.dataset.id;
    
    let deletedBook = await booksService.deleteBook(bookId)
    loadBooks()
}