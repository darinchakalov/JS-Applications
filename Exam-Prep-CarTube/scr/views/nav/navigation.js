import authServices from "../../services/authServices.js";
import { html } from "../../utils.js";

let navigationTemplate = (logoutHandler, isLoggedIn, currentPage) => html` <nav>
	<a class=${currentPage === '/home' ? 'active' : undefined} href="/home">Home</a>
	<a class=${currentPage === '/all-listings' ? 'active' : undefined} href="/all-listings">All Listings</a>
	<a class=${currentPage === '/by-year' ? 'active' : undefined} href="/by-year">By Year</a>
	<!-- Guest users -->
    ${isLoggedIn ? userNavTemplate(logoutHandler, currentPage) : guestNavTemplate(currentPage)}
	<!-- Logged users -->
</nav>`;

let guestNavTemplate = (currentPage) => html` <div id="guest">
	<a class=${currentPage === '/login' ? 'active' : undefined} href="/login">Login</a>
	<a class=${currentPage === '/register' ? 'active' : undefined} href="/register">Register</a>
</div>`;

let userNavTemplate = (logoutHandler, currentPage) => html`
	<div id="profile">
		<a>Welcome ${sessionStorage.getItem('username')}</a>
		<a class=${currentPage === '/my-listings' ? 'active' : undefined} href="/my-listings">My Listings</a>
		<a class=${currentPage === '/create' ? 'active' : undefined} href="/create">Create Listing</a>
		<a @click=${logoutHandler} href="#">Logout</a>
	</div>
`;

export function renderNavigation(context) {
    let currentPage = context.pathname
	let isLoggedIn = authServices.isLoggedIn();

	async function logoutHandler(e) {
		let logoutRequest = await authServices.logout()
		context.page.redirect('/home')
	}

	return navigationTemplate(logoutHandler, isLoggedIn, currentPage);
}
