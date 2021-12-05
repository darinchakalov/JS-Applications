import musicServices from "../services/musicServices.js";
import { html } from "../utils.js";

let catalogTemplate = (albums) => html`<section id="catalogPage">
	<h1>All Albums</h1>

	${showTemplate(albums)}

	<!--No albums in catalog-->
</section>`;

let singleAlbumTemplate = (album) => html` <div class="card-box">
	<img src=${album.imgUrl} />
	<div>
		<div class="text-center">
			<p class="name">Name: ${album.name}</p>
			<p class="artist">Artist: ${album.artist}</p>
			<p class="genre">Genre: ${album.genre}</p>
			<p class="price">Price: $${album.price}</p>
			<p class="date">Release Date: ${album.releaseDate}</p>
		</div>
		${sessionStorage.getItem('authToken') !== null ? showDetailsButtonTemplate(album) : ''}
	</div>
</div>`;

let showDetailsButtonTemplate = (album) => html`<div class="btn-group">
	<a href="/details/${album._id}" id="details">Details</a>
</div>`;

let noAlbumsTemplate = () => html`<p>No Albums in Catalog!</p>`;

function showTemplate(albums) {
	if (albums.length > 0) {
		return albums.map(singleAlbumTemplate);
	} else {
		return noAlbumsTemplate();
	}
}

export async function renderCatalogPage(context) {
	let albums = await musicServices.getAllAlbums();

	context.renderView(catalogTemplate(albums));
}
