import authServices from "../services/authServices.js";
import { html } from "../utils.js";

let loginTemplate = (onSubmit) => html`<section id="login-page" class="auth">
<form @submit=${onSubmit} id="login">

	<div class="container">
		<div class="brand-logo"></div>
		<h1>Login</h1>
		<label for="email">Email:</label>
		<input type="email" id="email" name="email" placeholder="Sokka@gmail.com">

		<label for="login-pass">Password:</label>
		<input type="password" id="login-password" name="password">
		<input type="submit" class="btn submit" value="Login">
		<p class="field">
			<span>If you don't have profile click <a href="#">here</a></span>
		</p>
	</div>
</form>
</section>`;

export function renderLoginPage(context) {
	async function onSubmit(e) {
		e.preventDefault()
		
		let userData = Object.fromEntries(new FormData(e.target))
		if (!userData.email || !userData.password) {
			return alert('All fields are required!')
		}

		await authServices.login(userData)
		context.page.redirect('/')
	}

	context.renderView(loginTemplate(onSubmit))
}
