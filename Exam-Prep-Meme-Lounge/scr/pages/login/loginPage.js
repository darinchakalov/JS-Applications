import authServices from "../../services/authServices.js";
import { notificationsTemplate } from "../../views/notifications/notificationsTemplate.js";
import { loginTemplate } from "./loginTemplate.js";

async function submitHandler(context, e) {
	e.preventDefault();
    
	let loginData = Object.fromEntries(new FormData(e.target));
	if (!loginData.email || !loginData.password) {
		context.renderNotification(notificationsTemplate('Email and password should be filled'))
		setTimeout(() => context.renderNotification(null), 3000)
		return
	}
	let loginRequest = await authServices.login(loginData);
	if (loginRequest.message) {
		context.renderNotification(notificationsTemplate(loginRequest.message))
		setTimeout(() => context.renderNotification(null), 3000)
		return
	}
	context.page.redirect("/allMemes");
}

function showPage(context, next) {
	let boundSubmitHandler = submitHandler.bind(null, context);
	let form = {
		submitHandler: boundSubmitHandler,
	};
	let resultTemplate = loginTemplate(form);
	context.renderView(resultTemplate);

	next()
}

export default {
	showPage,
};
