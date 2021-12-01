import { html } from "../utils.js";

let editTemplate = (car, onEdit) => html``;

export async function renderEditPage(context) {
	let carId = context.params.id;
	let currentCar = await carListServices.getSingleCar(carId);

	function onEdit(e) {
		e.preventDefault();

		let editData = Object.fromEntries(new FormData(e.target));
		if ('') {
			return alert("All fields are mandatory!");
		}
		context.page.redirect("/");
	}
	context.renderView(editTemplate(currentCar, onEdit));
}
