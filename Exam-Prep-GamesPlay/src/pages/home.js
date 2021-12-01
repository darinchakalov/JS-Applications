import gamesServices from "../services/gamesServices.js";
import { html } from "../utils.js";

let homeTemplate = (games) => html`<section id="welcome-world">
	<div class="welcome-message">
		<h2>ALL new games are</h2>
		<h3>Only in GamesPlay</h3>
	</div>
	<img src="./images/four_slider_img01.png" alt="hero" />

	<div id="home-page">
		<h1>Latest Games</h1>
		${renderGamesTemplate(games)}
	</div>
</section>`;

let renderGamesTemplate = (games) => {
	if (games.length > 0) {
        return games.map(singleGameTemplate)
	} else {
		return html`<p class="no-articles">No games yet</p>`;
	}
};

let singleGameTemplate = (game) => html`<div class="game">
	<div class="image-wrap">
		<img src=${game.imageUrl} />
	</div>
	<h3>${game.title}</h3>
	<div class="rating"><span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span></div>
	<div class="data-buttons">
		<a href="/details/${game._id}" class="btn details-btn">Details</a>
	</div>
</div>`;

export async function renderHomePage(context) {
    let games = await gamesServices.getAllGames()
	context.renderView(homeTemplate(games));
}
