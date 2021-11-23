import memeServices from "../../services/memeServices.js";
import { notificationsTemplate } from "../../views/notifications/notificationsTemplate.js";
import { createTemplate } from "./createTemplate.js";

async function submitHandler(context, e) {
	e.preventDefault();

	let formData = Object.fromEntries(new FormData(e.target));

	if (!formData.title || !formData.description || !formData.imageUrl) {
		context.renderNotification(notificationsTemplate("All fields must be filled!"));
		setTimeout(() => {
			context.renderNotification(null);
		}, 3000);
		return;
	}

	let createRequest = memeServices.create(formData);
	context.page.redirect("/allMemes");
}

function showPage(context) {
	let boundSubmitHandler = submitHandler.bind(null, context);

	let form = {
		submitHandler: boundSubmitHandler,
	};

	let resultTemplate = createTemplate(form);
	context.renderView(resultTemplate);
}

export default {
	showPage,
};
