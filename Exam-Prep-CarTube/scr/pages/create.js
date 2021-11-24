import carListServices from "../services/carListServices.js";
import { html } from "../utils.js";

let createTemplate = (onCreate) => html` <section id="create-listing">
	<div class="container">
		<form @submit=${onCreate} id="create-form">
			<h1>Create Car Listing</h1>
			<p>Please fill in this form to create an listing.</p>
			<hr />

			<p>Car Brand</p>
			<input type="text" placeholder="Enter Car Brand" name="brand" />

			<p>Car Model</p>
			<input type="text" placeholder="Enter Car Model" name="model" />

			<p>Description</p>
			<input type="text" placeholder="Enter Description" name="description" />

			<p>Car Year</p>
			<input type="number" placeholder="Enter Car Year" name="year" />

			<p>Car Image</p>
			<input type="text" placeholder="Enter Car Image" name="imageUrl" />

			<p>Car Price</p>
			<input type="number" placeholder="Enter Car Price" name="price" />

			<hr />
			<input type="submit" class="registerbtn" value="Create Listing" />
		</form>
	</div>
</section>`;

export async function renderCreatePage(context) {
	function onCreate(e) {
		e.preventDefault();

		let createData = Object.fromEntries(new FormData(e.target));
		if (
			!createData.brand ||
			!createData.model ||
			!createData.description ||
			!createData.year ||
			!createData.imageUrl ||
			!createData.price
		) {
			return alert("All fields are mandatory!");
		}
		createData.year = Number(createData.year);
		createData.price = Number(createData.price);

		let createdCar = carListServices.createListing(createData);
		context.page.redirect("/all-listings");
	}

	context.renderView(createTemplate(onCreate));
}
