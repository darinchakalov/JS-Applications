import { html } from "../../utils.js";

export let detailsTemplate = (meme) => html` <section id="meme-details">
	<h1>Meme Title: ${meme.title}</h1>
	<div class="meme-details">
		<div class="meme-img">
			<img alt="meme-alt" src=${meme.imageUrl} />
		</div>
		<div class="meme-description">
			<h2>Meme Description</h2>
			<p>${meme.description}</p>

			<!-- Buttons Edit/Delete should be displayed only for creator of this meme  -->
            ${meme.isOwner ? userButtonsTemplate(meme) : ''}
		</div>
	</div>
</section>`;

let userButtonsTemplate = (meme) => html` <a class="button warning" href="/edit/${meme._id}">Edit</a>
	<button @click=${meme.deleteHandler} class="button danger">Delete</button>`;
