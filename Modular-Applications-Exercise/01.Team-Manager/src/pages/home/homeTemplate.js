import { html } from "../../../node_modules/lit-html/lit-html.js";

export let homeTemplate = (isLoggedIn) => html` <section id="home">
	<article class="hero layout">
		<img src="./assets/team.png" class="left-col pad-med" />
		<div class="pad-med tm-hero-col">
			<h2>Welcome to Team Manager!</h2>
			<p>Want to organize your peers? Create and manage a team for free.</p>
			<p>Looking for a team to join? Browse our communities and find like-minded people!</p>
			${isLoggedIn ? userTemplate() : guestTemplate()}
		</div>
	</article>
</section>`;

let guestTemplate = () => html` <a href="/register" class="action cta">Sign Up Now</a> `;
let userTemplate = () => html` <a href="/browse-teams" class="action cta">Browse Teams</a> `;
