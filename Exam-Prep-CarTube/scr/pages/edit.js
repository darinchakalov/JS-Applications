import carListServices from "../services/carListServices.js";
import { html } from "../utils.js";

let editTemplate = (car, onEdit) => html` <section id="edit-listing">
	<div class="container">
		<form @submit=${onEdit} id="edit-form">
			<h1>Edit Car Listing</h1>
			<p>Please fill in this form to edit an listing.</p>
			<hr />

			<p>Car Brand</p>
			<input type="text" placeholder="Enter Car Brand" name="brand" .value=${car.brand} />

			<p>Car Model</p>
			<input type="text" placeholder="Enter Car Model" name="model" .value=${car.model} />

			<p>Description</p>
			<input type="text" placeholder="Enter Description" name="description" .value=${car.description} />

			<p>Car Year</p>
			<input type="number" placeholder="Enter Car Year" name="year" .value=${car.year} />

			<p>Car Image</p>
			<input type="text" placeholder="Enter Car Image" name="imageUrl" .value=${car.imageUrl} />

			<p>Car Price</p>
			<input type="number" placeholder="Enter Car Price" name="price" .value=${car.price} />

			<hr />
			<input type="submit" class="registerbtn" value="Edit Listing" />
		</form>
	</div>
</section>`;

export async function renderEditPage(context) {
	let carId = context.params.id;
	let currentCar = await carListServices.getSingleCar(carId);

	function onEdit(e) {
		e.preventDefault();

		let editData = Object.fromEntries(new FormData(e.target));
		if (
			!editData.brand ||
			!editData.model ||
			!editData.description ||
			!editData.year ||
			!editData.imageUrl ||
			!editData.price
		) {
			return alert("All fields are mandatory!");
		}
		editData.year = Number(editData.year);
		editData.price = Number(editData.price);

		let editedCar = carListServices.editListing(carId, editData);
		context.page.redirect("/all-listings");
	}
	context.renderView(editTemplate(currentCar, onEdit));
}
