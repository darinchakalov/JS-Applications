import musicServices from "../services/musicServices.js";
import { html } from "../utils.js";
import { render } from "../../node_modules/lit-html/lit-html.js";

let searchTemplate = (onSearch) => html` <section id="searchPage">
	<h1>Search by Name</h1>

	<div class="search">
		<input id="search-input" type="text" name="search" placeholder="Enter desired albums's name" />
		<button @click=${onSearch} class="button-list">Search</button>
	</div>

	<h2>Results:</h2>

	<!--Show after click Search button-->
	<div class="search-result">
		<!--If have matches-->
		<!--If there are no matches-->
	</div>
</section>`;

let singleAlbumTemplate = (album) => html`<div class="card-box">
	<img src=${album.imgUrl} />
	<div>
		<div class="text-center">
			<p class="name">Name: ${album.name}</p>
			<p class="artist">Artist: ${album.artist}</p>
			<p class="genre">Genre: ${album.genre}</p>
			<p class="price">Price: $${album.price}</p>
			<p class="date">Release Date: ${album.releaseDate}</p>
		</div>
		${sessionStorage.getItem("authToken") !== null ? showDetailsButtonTemplate(album) : ""}
	</div>
</div>`;

let showDetailsButtonTemplate = (album) => html`<div class="btn-group">
	<a href="/details/${album._id}" id="details">Details</a>
</div>`;

let noResultTemplate = () => html`<p class="no-result">No result.</p>`;

export async function renderSearchPage(context) {
	let albums;

	async function onSearch(e) {
		e.preventDefault();

		let listingsSection = document.querySelector(".search-result");
		let searchString = document.querySelector("#search-input").value;
		let foundAlbums = await musicServices.searchAlbums(searchString);
		console.log(foundAlbums);
		if (foundAlbums.length > 0) {
			render(foundAlbums.map(singleAlbumTemplate), listingsSection);
		} else {
			render(noResultTemplate(), listingsSection);
		}
	}

	context.renderView(searchTemplate(onSearch, albums));
}
