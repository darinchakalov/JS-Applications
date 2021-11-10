import { showSection } from "../elements/dom.js";
import { getAllIdeas } from "../services/ideasServices.js";
import { ideaPreview } from "../elements/domElementsStorage.js";
import { showDetailsPage } from "./detailsPage.js";

const dashPage = document.querySelector("#dashboard-holder");
let noIdeasMessage = document.querySelector("#dashboard-holder > h1");

export async function showDashPage() {
	showSection(dashPage);
	let ideas = await getAllIdeas();
	if (ideas.length === 0) {
		dashPage.replaceChildren(noIdeasMessage);
	} else {
		noIdeasMessage.remove();
		renderAllIdeas(ideas);
	}
}

async function renderAllIdeas(ideas) {
	let ideasFragment = document.createDocumentFragment();
	ideas.forEach((idea) => {
		ideasFragment.appendChild(ideaPreview(idea));
	});
	dashPage.replaceChildren(ideasFragment);
}

dashPage.addEventListener('click', onDetails)

async function onDetails(e) {
	e.preventDefault();
	if (e.target.tagName === 'BUTTON') {
		const ideaId = e.target.dataset.id;
		showDetailsPage(ideaId)
	}
}