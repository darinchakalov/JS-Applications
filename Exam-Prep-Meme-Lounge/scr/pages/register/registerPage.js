import authServices from "../../services/authServices.js";
import { notificationsTemplate } from "../../views/notifications/notificationsTemplate.js";
import { registerTemplate } from "./registerTemplate.js";

async function submitHandler(context, e) {
	e.preventDefault();

	let registerData = Object.fromEntries(new FormData(e.target));
	if (!registerData.username || !registerData.email || !registerData.password || !registerData.repeatPass) {
		context.renderNotification(notificationsTemplate("All fields must be filled!"));
		setTimeout(() => context.renderNotification(null), 3000);
		return;
	}
	let registerRequest = await authServices.register(registerData);
	if (registerRequest.message) {
		context.renderNotification(notificationsTemplate(registerRequest.message));
		setTimeout(() => context.renderNotification(null), 3000);
		return;
	}
	context.page.redirect("/allMemes");
}

function showPage(context) {
	let boundSubmitHandler = submitHandler.bind(null, context);
	let form = {
		submitHandler: boundSubmitHandler,
	};
	let resultTemplate = registerTemplate(form);
	context.renderView(resultTemplate);
}

export default {
	showPage,
};
