import gamesServices from "../services/gamesServices.js";
import { html } from "../utils.js";

let catalogTemplate = (games) => html`
	<section id="catalog-page">
		<h1>All Games</h1>		
		${renderGamesTemplate(games)}
	</section>
`;

let renderGamesTemplate = (games) => {
	if (games.length > 0) {
        return games.map(singleGameTemplate)
	} else {
		return html`<h3 class="no-articles">No articles yet</h3>`;
	}
};

let singleGameTemplate = (game) => html`<div class="allGames">
<div class="allGames-info">
    <img src=${game.imageUrl} />
    <h6>${game.category}</h6>
    <h2>${game.title}</h2>
    <a href="/details/${game._id}" class="details-button">Details</a>
</div>
</div>`

export async function renderCatalogPage(context) {
    let games = await gamesServices.getAllGames()
    context.renderView(catalogTemplate(games))
}