import { render } from "../utils.js";

let mainSection = undefined;
let navSection = undefined;
let container = undefined;

export function initialize(mainSectionElement, navSectionElement, containerElement) {
	mainSection = mainSectionElement;
	navSection = navSectionElement;
	container = containerElement;
}

export function showNotification(template) {
	render(template, container);
}

export function showView(template) {
	render(template, mainSection);
}

export function showNav(template) {
	render(template, navSection);
}

export function renderMiddleware(context, next) {
	context.renderNav = showNav;
	context.renderView = showView;
	context.renderNotification = showNotification;

	next();
}
