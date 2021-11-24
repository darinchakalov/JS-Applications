import carListServices from "../services/carListServices.js";
import { html } from "../utils.js";

let allListingsTemplate = (cars) => html`
	<section id="car-listings">
		<h1>Car Listings</h1>
		<div class="listings">
			<!-- Display all records -->
			${cars.length > 0 ? cars.map(singleCarTemplate) : noCarsTemplate()}
			<!-- Display if there are no records -->
		</div>
	</section>
`;

let noCarsTemplate = () => html` <p class="no-cars">No cars in database.</p>`;

let singleCarTemplate = (car) => html`<div class="listing">
	<div class="preview">
		<img src=${car.imageUrl} />
	</div>
	<h2>${car.brand} ${car.model}</h2>
	<div class="info">
		<div class="data-info">
			<h3>Year: ${car.year}</h3>
			<h3>Price: ${car.price} $</h3>
		</div>
		<div class="data-buttons">
			<a href="/details/${car._id}" class="button-carDetails">Details</a>
		</div>
	</div>
</div>`;

export async function renderAllListingsPage(context) {
	let allCars = await carListServices.getAllCars();
	context.renderView(allListingsTemplate(allCars));
}
