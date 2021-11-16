import authService from "../../services/authService.js";
import { deleteFurniture, getSingleFurniture } from "../../services/furnitureServices.js";
import { detailsTemplate } from "./detailsTemplate.js";

async function deleteHandler(context, id, e) {
	let confirmed = confirm('Are you sure you want to delete this furniture?')
	if (confirmed) {
		let deleteResult = await deleteFurniture(id);
		context.page.redirect("/dashboard");
	}
}

async function showView(context) {
	const furnitureId = context.params.id;
	let boundDeleteHandler = deleteHandler.bind(null, context, furnitureId);
	let furniture = await getSingleFurniture(furnitureId);
	if (furniture._ownerId === authService.getUserId()) {
		furniture.isOwner = true;
	}
	let templateResult = detailsTemplate(furniture, boundDeleteHandler);
	context.renderView(templateResult);
}

export default {
	showView,
};
