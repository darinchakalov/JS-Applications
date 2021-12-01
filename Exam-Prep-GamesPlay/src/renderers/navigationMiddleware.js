import { render } from "../utils.js";
import { renderNavigation } from "../views/nav.js";

let navSection = undefined;

export function initializeNav(navSectionElement) {
	navSection = navSectionElement;
}

export function naviagationMiddleware(context, next) {
	render(renderNavigation(context), navSection);

	next();
}
