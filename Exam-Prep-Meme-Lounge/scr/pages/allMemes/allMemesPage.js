import memeServices from "../../services/memeServices.js";
import { allMemesTemplate } from "./allMemesTemplate.js";



async function showPage(context) {
	let allMemes = await memeServices.getAll()
	let resultTemplate = allMemesTemplate(allMemes)
	context.renderView(resultTemplate);
}

export default {
    showPage
}