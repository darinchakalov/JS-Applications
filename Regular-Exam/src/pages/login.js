import authServices from "../services/authServices.js";
import { html } from "../utils.js";

let loginTemplate = (onSubmit) => html`<section id="loginPage">
<form @submit=${onSubmit}>
	<fieldset>
		<legend>Login</legend>

		<label for="email" class="vhide">Email</label>
		<input id="email" class="email" name="email" type="text" placeholder="Email">

		<label for="password" class="vhide">Password</label>
		<input id="password" class="password" name="password" type="password" placeholder="Password">

		<button type="submit" class="login">Login</button>

		<p class="field">
			<span>If you don't have profile click <a href="/register">here</a></span>
		</p>
	</fieldset>
</form>
</section>`;

export function renderLoginPage(context) {
	async function onSubmit(e) {
		e.preventDefault()
		
		let userData = Object.fromEntries(new FormData(e.target))
		if (!userData.email || !userData.password) {
			return alert('All fields are required!')
		}

		let loginRequest = await authServices.login(userData)
		context.page.redirect('/')
	}

	context.renderView(loginTemplate(onSubmit))
}
