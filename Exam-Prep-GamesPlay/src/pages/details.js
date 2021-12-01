import authServices from "../services/authServices.js";
import gamesServices from "../services/gamesServices.js";
import { html } from "../utils.js";

let detailsTemplate = (game) => html`<section id="game-details">
	<h1>Game Details</h1>
	<div class="info-section">
		<div class="game-header">
			<img class="game-img" src=${game.imageUrl} />
			<h1>${game.title}</h1>
			<span class="levels">MaxLevel: ${game.maxLevel}</span>
			<p class="type">${game.category}</p>
		</div>

		<p class="text">${game.summary}</p>

		<!-- Bonus ( for Guests and Users ) -->
		<div class="details-comments">
			${commentsTemplate(game)}
			<!-- Display paragraph: If there are no games in the database -->
		</div>

		<!-- Edit/Delete buttons ( Only for creator of this game )  -->
		${ownerTemplate(game)}
	</div>

	<!-- Bonus -->
	<!-- Add Comment ( Only for logged-in users, which is not creators of the current game ) -->
	${createCommentTemplate(game)}
</section>`;

let commentsTemplate = (game) => {
	if (game.comments.length > 0) {
		return html` <h2>Comments:</h2>
			<ul>
				${game.comments.map(singleCommentTemplate)}
			</ul>`;
	} else {
		return html`<p class="no-comment">No comments.</p>`;
	}
};

let singleCommentTemplate = (comment) => html`<li class="comment">
	<p>Content: ${comment.comment}</p>
</li>`;

let ownerTemplate = (game) => {
	if (game.isOwner && authServices.isLoggedIn()) {
		return html`<div class="buttons">
			<a href="/edit/${game._id}" class="button">Edit</a>
			<a @click=${game.deleteHandler} href="javascript:void(0)" class="button">Delete</a>
		</div>`;
	}
};

let createCommentTemplate = (game) => {
	if (!game.isOwner && authServices.isLoggedIn() ) {
		return html` <article class="create-comment">
			<label>Add new comment:</label>
			<form @submit=${game.createCommentHandler} class="form">
				<textarea name="comment" placeholder="Comment......"></textarea>
				<input class="btn submit" type="submit" value="Add Comment" />
			</form>
		</article>`;
	}
};

export async function renderDetailsPage(context) {
	let gameId = context.params.id;

	let currentGame = await gamesServices.getSingleGame(gameId);
	if (currentGame._ownerId === sessionStorage.getItem("userId")) {
		currentGame.isOwner = true;
	}

	async function onComment(e) {
		e.preventDefault();

		let commentData = Object.fromEntries(new FormData(e.target));
		if (!commentData.comment) {
			return alert("Cannot post empty comment!");
		}
		let gameData = {
			gameId: gameId,
			comment: commentData.comment,
		};
		console.log(gameData);
		await gamesServices.createComment(gameData);
		context.page.redirect("/details/" + gameId);
	}

	async function onDelete() {
		await gamesServices.deleteGame(gameId)
		context.page.redirect('/')
	}

	currentGame.createCommentHandler = onComment;
	currentGame.deleteHandler = onDelete;

	let gameComments = await gamesServices.getAllComments(gameId);
	currentGame.comments = gameComments;
	context.renderView(detailsTemplate(currentGame));
}
