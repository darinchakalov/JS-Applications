import carListServices from "../services/carListServices.js";
import { html } from "../utils.js";

let createTemplate = (onCreate) => html``;

export async function renderCreatePage(context) {
	function onCreate(e) {
		e.preventDefault();

		let createData = Object.fromEntries(new FormData(e.target));
		if ('') {
			return alert("All fields are mandatory!");
		}

		context.page.redirect("/");
	}

	context.renderView(createTemplate(onCreate));
}
