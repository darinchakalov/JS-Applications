import { html, render } from "../node_modules/lit-html/lit-html.js";

const dropDownMenu = document.querySelector("#menu");
const addBtn = document.querySelector("body > article > form > input[type=submit]:nth-child(3)");
const inputField = document.querySelector("#itemText");
const endpoint = "http://localhost:3030/jsonstore/advanced/dropdown";

const template = (list) => html`${list.map((item) => html`<option value="${item._id}">${item.text}</option>`)}`;

initialize();

function initialize() {
	populateList();
	addBtn.addEventListener("click", addItem);
}

async function addItem(e) {
	e.preventDefault();

	const item = {
		text: inputField.value,
	};

	const postRequest = await fetch(endpoint, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(item),
	});
	const data = await postRequest.json();
	populateList();
    inputField.value = '';
}

async function populateList() {
	const request = await fetch(endpoint);
	const data = await request.json();
	let list = Object.values(data);

	render(template(list), dropDownMenu);
}
