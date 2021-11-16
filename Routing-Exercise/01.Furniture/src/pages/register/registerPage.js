import authService from "../../services/authService.js";
import { registerTemplate } from "./registerTemplate.js";

async function submitHandler(context, e) {
	e.preventDefault();
	let formData = new FormData(e.target);

	if (formData.get("password") !== formData.get("rePass")) {
		return alert("Passwords should match!");
	}
	let user = {
		email: formData.get("email"),
		password: formData.get("password"),
	};
	let registerResult = await authService.register(user);
	context.page.redirect("/dashboard");
}

function showView(context) {
	let boundSubmitHandler = submitHandler.bind(null, context);
	let form = {
		submitHandler: boundSubmitHandler,
	};
	let templateResult = registerTemplate(form)
	context.renderView(templateResult);
}

export default {
	showView,
};
