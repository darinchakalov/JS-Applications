import { html } from "../../../node_modules/lit-html/lit-html.js";

export let navTemplate = (navInfo) => html`
	<a href="/home" class="site-logo">Team Manager</a>
	<nav>
		<a href="/browse-teams" class="action">Browse Teams</a>
		${navInfo.isLoggedIn ? userTemplate() : guestTemplate()}
	</nav>
`;

let guestTemplate = () => html` <a href="/login" class="action">Login</a>
	<a href="/register" class="action">Register</a>`;

let userTemplate = () => html`
	<a href="/my-teams" class="action">My Teams</a>
	<a href="/logout" class="action">Logout</a>
`;
