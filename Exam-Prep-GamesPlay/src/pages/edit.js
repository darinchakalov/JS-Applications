import gamesServices from "../services/gamesServices.js";
import { html } from "../utils.js";

let editTemplate = (game) => html`<section id="edit-page" class="auth">
	<form @submit=${game.editHandler} id="edit">
		<div class="container">
			<h1>Edit Game</h1>
			<label for="leg-title">Legendary title:</label>
			<input type="text" id="title" name="title" .value=${game.title} />

			<label for="category">Category:</label>
			<input type="text" id="category" name="category" .value=${game.category} />

			<label for="levels">MaxLevel:</label>
			<input type="number" id="maxLevel" name="maxLevel" min="1" .value=${game.maxLevel} />

			<label for="game-img">Image:</label>
			<input type="text" id="imageUrl" name="imageUrl" .value=${game.imageUrl} />

			<label for="summary">Summary:</label>
			<textarea name="summary" id="summary" .value=${game.summary}></textarea>
			<input class="btn submit" type="submit" value="Edit Game" />
		</div>
	</form>
</section>`;

export async function renderEditPage(context) {
	let gameId = context.params.id;
	let currentGame = await gamesServices.getSingleGame(gameId);

	async function onEdit(e) {
		e.preventDefault();

		let editData = Object.fromEntries(new FormData(e.target));
		if (!editData.title || !editData.category || !editData.maxLevel || !editData.imageUrl || !editData.summary) {
			return alert("All fields are mandatory!");
		}
		await gamesServices.editGame(gameId, editData);
		context.page.redirect("/details/" + gameId);
	}

	currentGame.editHandler = onEdit;
	context.renderView(editTemplate(currentGame));
}
