import authServices from "../../services/authServices.js";
import { navTemplate } from "./navTemplate.js";

function showView(context, next) {
	let navInfo = {
		isLoggedIn: authServices.isLoggedIn(),
		currentPage: context.pathname,
	};
	let resultTemplate = navTemplate(navInfo, sessionStorage.getItem('email'));
	context.renderNav(resultTemplate);

	next();
}

export default {
	showView,
};
