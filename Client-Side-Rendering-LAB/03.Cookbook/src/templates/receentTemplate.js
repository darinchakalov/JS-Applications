import { html } from "../../node_modules/lit-html/lit-html.js";

const recentRecipeTemplate = (recipe) =>
	html`<article class="recent">
		<div class="recent-preview"><img src=${recipe.img} /></div>
		<div class="recent-title">${recipe.name}</div>
	</article>`;

const pager = (goTo, page, pages) => html`
Page ${page} of ${pages}
${page > 1 ? html`<a class="pager" href="/catalog" @click=${e => changePage(e, goTo, page - 1)}>&lt; Prev</a>` : ''}
${page < pages ? html`<a class="pager" href="/catalog" @click=${e => changePage(e, goTo, page + 1)}>Next &gt;</a>` : ''}`;

function changePage(e, goTo, newPage) {
    e.preventDefault();
    goTo('catalog', newPage);
}
export default recentRecipeTemplate;
