import { render } from "../node_modules/lit-html/lit-html.js";

import nav from "./pages/nav/nav.js";

let rootElement = document.querySelector("main");
let navMenuElement = document.querySelector("header");

const contextRender = (templateResult) => {
	render(templateResult, rootElement);
};

export function renderMiddleware(context, next) {
	render(nav.showView(context), navMenuElement)
	context.renderView = contextRender;
	next();
}
