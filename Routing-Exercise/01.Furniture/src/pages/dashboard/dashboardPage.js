import { getAllFurniture } from "../../services/furnitureServices.js";
import { dashBoardTemplate } from "./dashboardTemplate.js";

async function showView(context) {
	const allFurnitures = await getAllFurniture();
	const templateResult = dashBoardTemplate(allFurnitures);
	context.renderView(templateResult);
}

export default {
	showView,
};
