import memeServices from "../../services/memeServices.js";
import { detailsTemplate } from "./memeDetailsTemplate.js";

async function deleteHandler(context, id, e) {
	console.log("here");
	let confirmed = confirm("Are you sure you want to delete this meme?");
	if (confirmed) {
		let deleteRequest = memeServices.deleteMeme(id);
		context.page.redirect("/allMemes");
	}
}

async function showPage(context) {
	let memeId = context.params.id;
	let boundDeleteHandler = deleteHandler.bind(null, context, memeId);
	let currentMeme = await memeServices.getSingleMeme(memeId);
	if (currentMeme._ownerId === sessionStorage.getItem("userId")) {
		currentMeme.isOwner = true;
		currentMeme.deleteHandler = boundDeleteHandler;
	}
	let resultTemplate = detailsTemplate(currentMeme);
	context.renderView(resultTemplate);
}

export default {
	showPage,
};
