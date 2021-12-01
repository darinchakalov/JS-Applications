import { html } from "../utils.js";

let navigationTemplate = () => html``;


export function renderNavigation(context) {
    async function onLogout() {
        await authServices.logout()
        context.page.redirect('/')
    }
	return navigationTemplate(authServices.isLoggedIn(), onLogout);
}