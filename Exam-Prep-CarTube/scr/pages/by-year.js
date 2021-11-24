import carListServices from "../services/carListServices.js";
import { html, render } from "../utils.js";

let searchTemplate = (onSearch) => html`<section id="search-cars">
	<h1>Filter by year</h1>

	<div class="container">
		<input id="search-input" type="text" name="search" placeholder="Enter desired production year" />
		<button @click=${onSearch} class="button-list">Search</button>
	</div>

	<h2>Results:</h2>
	<div class="listings">
		<!-- Display all records -->
		<!-- Display if there are no matches -->
	</div>
</section>`;

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

let noListingsTemplate = () => html`<p class="no-cars">No results.</p>`;

export async function renderByYearPage(context) {
	async function onSearch(e) {
		e.preventDefault();

		let listingsSection = document.querySelector(".listings");
		let searchString = document.querySelector("#search-input").value;
		let foundListings = await carListServices.searchListings(searchString);
		console.log(foundListings);
		if (foundListings.length >0) {
			render(foundListings.map(singleCarTemplate), listingsSection);
		} else {
			render(noListingsTemplate(), listingsSection);

		}
	}

	context.renderView(searchTemplate(onSearch));
}
