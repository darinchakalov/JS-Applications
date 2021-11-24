import carListServices from "../services/carListServices.js";
import { html } from "../utils.js";

let detailsTemplate = (car, onDelete) => html`<section id="listing-details">
	<h1>Details</h1>
	<div class="details-info">
		<img src=${car.imageUrl} />
		<hr />
		<ul class="listing-props">
			<li><span>Brand:</span>${car.brand}</li>
			<li><span>Model:</span>${car.model}</li>
			<li><span>Year:</span>${car.year}</li>
			<li><span>Price:</span>${car.price}$</li>
		</ul>

		<p class="description-para">${car.description}</p>
		${car.isOwner ? owenerTemplate(car, onDelete) : ""}
	</div>
</section>`;

let owenerTemplate = (car, onDelete) => html` <div class="listings-buttons">
	<a href="/edit/${car._id}" class="button-list">Edit</a>
	<a @click=${onDelete} href="#" class="button-list">Delete</a>
</div>`;

export async function renderDetailsPage(context) {
	let carId = context.params.id;

	async function onDelete() {
		let deletedListing = await carListServices.deleteListing(carId);
		context.page.redirect("/all-listings");
	}

	let currentCar = await carListServices.getSingleCar(carId);
	currentCar.isOwner = currentCar._ownerId === sessionStorage.getItem("userId");
	context.renderView(detailsTemplate(currentCar, onDelete));
}
