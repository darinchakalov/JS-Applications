import authServices from "../services/authServices.js";
import { html } from "../utils.js";

let registerTemplate = (onSubmit) => html`<section id="registerPage">
<form @submit=${onSubmit}>
	<fieldset>
		<legend>Register</legend>

		<label for="email" class="vhide">Email</label>
		<input id="email" class="email" name="email" type="text" placeholder="Email">

		<label for="password" class="vhide">Password</label>
		<input id="password" class="password" name="password" type="password" placeholder="Password">

		<label for="conf-pass" class="vhide">Confirm Password:</label>
		<input id="conf-pass" class="conf-pass" name="conf-pass" type="password" placeholder="Confirm Password">

		<button type="submit" class="register">Register</button>

		<p class="field">
			<span>If you already have profile click <a href="/login">here</a></span>
		</p>
	</fieldset>
</form>
</section>`;


export function renderRegisterPage(context) {
	async function onSubmit(e) {
		e.preventDefault()

		let userData = Object.fromEntries(new FormData(e.target))
		if (!userData.email || !userData.password || !userData['conf-pass']) {
			return alert('All fields are mandatory!')
		} else if (userData.password !== userData['conf-pass']) {
			return alert('Password don\'t match')
		}
		let registerRequest = await authServices.register(userData)
		context.page.redirect('/')
	}


	context.renderView(registerTemplate(onSubmit))
}