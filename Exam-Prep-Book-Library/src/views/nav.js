import authServices from "../services/authServices.js";
import { html } from "../utils.js";

let navigationTemplate = (isLoggedIn, onLogout) => html` <nav class="navbar">
	<section class="navbar-dashboard">
		<a href="/dashboard">Dashboard</a>

		${isLoggedIn ? userTemplate(onLogout) : guestTemplate()}
	</section>
</nav>`;

let guestTemplate = () => html`<div id="guest">
	<a class="button" href="/login">Login</a>
	<a class="button" href="/register">Register</a>
</div>`;

let userTemplate = (onLogout) => html`<div id="user">
	<span>Welcome, ${sessionStorage.getItem('email')}</span>
	<a class="button" href="/my-books">My Books</a>
	<a class="button" href="/create">Add Book</a>
	<a @click=${onLogout} class="button" href="#">Logout</a>
</div>`;

export function renderNavigation(context) {
	let isLoggedIn = authServices.isLoggedIn();
    function onLogout(e) {
        e.preventDefault();
        let logoutRequest = authServices.logout()
        context.page.redirect('/')
    }
	return navigationTemplate(isLoggedIn, onLogout);
}
