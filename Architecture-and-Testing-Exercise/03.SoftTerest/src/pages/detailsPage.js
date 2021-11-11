import { showSection } from "../elements/dom.js";
import { ideaDetails } from "../elements/domElementsStorage.js";
import { deleteIdea } from "../services/ideasServices.js";
import { showDashPage } from "./dashPage.js";

const detailsPage = document.querySelector("#details");


export async function showDetailsPage(id) {
	let ideaFragment = document.createDocumentFragment();
	ideaFragment.appendChild(await ideaDetails(id));
	detailsPage.replaceChildren(ideaFragment);
	
	showSection(detailsPage);
	const deleteBtn = detailsPage.querySelector("button");
	if (deleteBtn) {
		deleteBtn.addEventListener("click", onDelete);
	}
}

export async function onDelete(e) {
	e.preventDefault();
	let id = e.target.dataset.id;
	let response = await deleteIdea(id)
	if (response !== undefined) {
		showDashPage()
	}
}
