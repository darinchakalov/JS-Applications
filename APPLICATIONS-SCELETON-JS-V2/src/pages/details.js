import carListServices from "../services/carListServices.js";
import { html } from "../utils.js";

let detailsTemplate = () => html``;

let owenerTemplate = () => html``;

export async function renderDetailsPage(context) {
	
	context.renderView(detailsTemplate());
}
