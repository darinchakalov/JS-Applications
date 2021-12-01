import authServices from "../services/authServices.js";
import { html } from "../utils.js";

let navigationTemplate = (isLoggedIn, onLogout) => html`<h1><a class="home" href="/home">GamesPlay</a></h1>
	<nav>
		<a href="/catalog">All games</a>
		
        ${userTemplate(isLoggedIn, onLogout)}
	</nav>`;

let userTemplate = (isLoggedIn, onLogout) => {
	if (isLoggedIn) {
		return html`<div id="user">
			<a href="/create">Create Game</a>
			<a @click=${onLogout} href="javascript:void(0)">Logout</a>
		</div>`;
	} else {
		return html`<div id="guest">
			<a href="/login">Login</a>
			<a href="/register">Register</a>
		</div>`;
	}
};

export function renderNavigation(context) {
    async function onLogout() {
        await authServices.logout()
        context.page.redirect('/')
    }
	return navigationTemplate(authServices.isLoggedIn(), onLogout);
}
