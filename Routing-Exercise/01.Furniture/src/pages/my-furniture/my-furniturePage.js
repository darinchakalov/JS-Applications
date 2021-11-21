import authService from "../../services/authService.js";
import { getMyFurniture } from "../../services/furnitureServices.js";
import { myFurnitureTemplate } from "./my-furnitureTemplate.js";

async function showView(context) {
	const userId = authService.getUserId();
	const allMyFurnitures = await getMyFurniture(userId);
	const templateResult = myFurnitureTemplate(allMyFurnitures);
	context.renderView(templateResult);
}

export default {
	showView,
};
