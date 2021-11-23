import { html, ifDefined } from "../../utils.js";


export let navTemplate = (navInfo, email) => html` <nav id="navSection">
	<a class=${ifDefined(navInfo.currentPage.startsWith("/allMemes") ? "active" : undefined)} href="/allMemes">All Memes</a>
	${navInfo.isLoggedIn === true ? usersTemplate(navInfo, email) : guestsTemplate(navInfo)}
</nav>`;

let usersTemplate = (navInfo, email) => html`
	<div class="user">
		<a class=${ifDefined(navInfo.currentPage.startsWith("/create") ? "active" : undefined)} href="/create">Create Meme</a>
		<div class="profile">
			<span>Welcome, ${email}</span>
			<a class=${ifDefined(navInfo.currentPage.startsWith("/myProfile") ? "active" : undefined)} href="/myProfile">My Profile</a>
			<a href="/logout">Logout</a>
		</div>
	</div>
`;

let guestsTemplate = (navInfo) => html`
	<div class="guest">
		<div class="profile">
			<a class=${ifDefined(navInfo.currentPage.startsWith("/login") ? "active" : undefined)} href="/login">Login</a>
			<a class=${ifDefined(navInfo.currentPage.startsWith("/register") ? "active" : undefined)} href="/register">Register</a>
		</div>
		<a class=${ifDefined(navInfo.currentPage.startsWith("/home") ? "active" : undefined)} href="/home">Home Page</a>
	</div>
`;
