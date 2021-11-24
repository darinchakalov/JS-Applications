import { html } from "../utils.js";

let homeTemplate = () => html``

export function renderHomePage(context) {
    context.renderView(homeTemplate())
}