import musicServices from "../services/musicServices.js";
import { html } from "../utils.js";

let detailsTemplate = (album) => html`<section id="detailsPage">
	<div class="wrapper">
		<div class="albumCover">
			<img src=${album.imgUrl} />
		</div>
		<div class="albumInfo">
			<div class="albumText">
				<h1>Name: ${album.name}</h1>
				<h3>Artist: ${album.artist}</h3>
				<h4>Genre: ${album.genre}</h4>
				<h4>Price: $${album.price}</h4>
				<h4>Date: ${album.releaseDate}</h4>
				<p>
					Description: ${album.description}
				</p>
			</div>

			<!-- Only for registered user and creator of the album-->
			${showButtons(album)}
		</div>
	</div>
</section>`;

function showButtons(album) {
	if (album._ownerId === sessionStorage.getItem('userId')) {
		return ownerTemplate(album)
	}
}

let ownerTemplate = (album) => html`<div class="actionBtn">
	<a href="/edit/${album._id}" class="edit">Edit</a>
	<a @click=${album.deleteHandler} href="javascript:void(0)" class="remove">Delete</a>
</div>`;

export async function renderDetailsPage(context) {
	let id = context.params.id;
	let currentAlbum = await musicServices.getSingleAlbum(id)

	async function onDelete() {
		await musicServices.deleteAlbum(id)
		context.page.redirect('/catalog')
	}
	currentAlbum.deleteHandler = onDelete

	context.renderView(detailsTemplate(currentAlbum));
}
