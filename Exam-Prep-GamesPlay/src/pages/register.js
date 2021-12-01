import authServices from "../services/authServices.js";
import { html } from "../utils.js";

let registerTemplate = (onSubmit) => html`<section id="register-page" class="content auth">
<form @submit=${onSubmit} id="register">
	<div class="container">
		<div class="brand-logo"></div>
		<h1>Register</h1>

		<label for="email">Email:</label>
		<input type="email" id="email" name="email" placeholder="maria@email.com">

		<label for="pass">Password:</label>
		<input type="password" name="password" id="register-password">

		<label for="con-pass">Confirm Password:</label>
		<input type="password" name="confirm-password" id="confirm-password">

		<input class="btn submit" type="submit" value="Register">

		<p class="field">
			<span>If you already have profile click <a href="#">here</a></span>
		</p>
	</div>
</form>
</section>`;


export function renderRegisterPage(context) {
	async function onSubmit(e) {
		e.preventDefault()

		let userData = Object.fromEntries(new FormData(e.target))
		if (!userData.email || !userData.password || !userData['confirm-password']) {
			return alert('All fields are mandatory!')
		} else if (userData.password !== userData['confirm-password']) {
			return alert('Password don\'t match')
		}
		await authServices.register(userData)
		context.page.redirect('/')
	}


	context.renderView(registerTemplate(onSubmit))
}