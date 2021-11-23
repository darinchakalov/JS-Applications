import memeServices from "../../services/memeServices.js";
import { notificationsTemplate } from "../../views/notifications/notificationsTemplate.js";
import { editTemplate } from "./editTemplate.js";

let form = undefined;

async function submitHandler(context, id, e) {
	e.preventDefault();

	let formData = Object.fromEntries(new FormData(e.target));
	console.log(formData);
	if (!formData.title || !formData.description || !formData.imageUrl) {
		context.renderNotification(notificationsTemplate("All fields must be filled!"));
		setTimeout(() => {
			context.renderNotification(null);
		}, 3000);
		return;
	}
	let editRequest = memeServices.editMeme(id, formData);
	context.page.redirect(`/allMemes`);
}

async function showPage(context) {
	let memeId = context.params.id;
	let boundSubmitHandler = submitHandler.bind(null, context, memeId);

    let meme = await memeServices.getSingleMeme(memeId)

	form = { 
        submitHandler: boundSubmitHandler,
        values: {
            title: meme.title,
            description: meme.description,
            imageUrl: meme.imageUrl
        }
    };
	let resultTemplate = editTemplate(form);
	context.renderView(resultTemplate);
}

export default {
	showPage,
};
