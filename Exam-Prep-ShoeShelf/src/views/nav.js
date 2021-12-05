import authServices from "../services/authServices.js";
import { html } from "../utils.js";

let navigationTemplate = (isLoggedIn, onLogout) => html`<nav>
	<ul>
        ${isLoggedIn ? userTemplate1() : ''}
		<li class="site-logo">Shoe</li>
		<li>
			<a href="">
				<img src="../public/sneakers.png" alt="" />
			</a>
		</li>
		<li class="site-logo">Shelf</li>
        ${isLoggedIn ? userTemplate2(onLogout) : ''}
	</ul>
</nav>`;



let userTemplate1 = () => html`<li>
	<a href="/create">Create new offer</a>
</li>`;

let userTemplate2 = (onLogout) => html`<li>
	Welcome, ${sessionStorage.getItem('email')} |
	<a @click=${onLogout} href="javascript:void(0)">Logout</a>
</li>`;

export function renderNavigation(context) {
	async function onLogout() {
		await authServices.logout();
		context.page.redirect("/");
	}
	return navigationTemplate(authServices.isLoggedIn(), onLogout);
}
