import authServices from "../services/authServices.js";
import { html } from "../utils.js";

let navigationTemplate = (isLoggedIn, onLogout) => html`<nav>
	<img src="./images/headphones.png" />
	<a href="/home">Home</a>
	<ul>
		<!--All user-->
		<li><a href="/catalog">Catalog</a></li>
		<li><a href="/search">Search</a></li>
		<!--Only guest-->
        ${isLoggedIn ? userTemplate(onLogout) : guestTemplate()}
		<!--Only user-->
	</ul>
</nav>`;

let guestTemplate = () => html` <li><a href="/login">Login</a></li>
	<li><a href="/register">Register</a></li>`;

let userTemplate = (onLogout) => html` <li><a href="/create">Create Album</a></li>
	<li><a @click=${onLogout} href="javascript:void(0)">Logout</a></li>`;

export function renderNavigation(context) {
    let isLoggedIn = authServices.isLoggedIn();

	async function onLogout() {
		await authServices.logout();
		context.page.redirect("/");
	}
	return navigationTemplate(isLoggedIn, onLogout);
}
