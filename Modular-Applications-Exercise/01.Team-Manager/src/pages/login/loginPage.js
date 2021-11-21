import authServices from "../../services/authServices.js";
import { loginTemplate } from "./loginTemplate.js";

let form = {}
let errorMessage;
async function submitHandler(context, e) {
	e.preventDefault();
	let user = Object.fromEntries(new FormData(e.target));
	let loginResult = await authServices.login(user);
    if (loginResult !== undefined) {
        context.page.redirect('/')
    }
}

function showView(context) {
	let boundSubmitHandler = submitHandler.bind(null, context);
	form = {
		submitHandler: boundSubmitHandler,
	};
	let resultTemplate = loginTemplate(form, errorMessage);
	context.renderView(resultTemplate);
}

export default {
	showView,
};
