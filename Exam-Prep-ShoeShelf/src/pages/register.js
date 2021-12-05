import authServices from "../services/authServices.js";
import { html } from "../utils.js";

let registerTemplate = (onSubmit) => html`<h1>Register</h1>
<p class="form-info">Already registered?
	<a href="/login">Login now</a> and have some fun!
</p>

<form @submit=${onSubmit} action="">
	<div>
		<input type="email" name="email" placeholder="Email...">
	</div>
	<div>
		<input type="password" name="password" placeholder="Password">
	</div>
	<div>
		<input type="password" name="repeatPass" placeholder="Re-password">
	</div>
	<div>
		<p class="message"></p>
		<button type="submit">Register</button>
	</div>
</form>`;


export function renderRegisterPage(context) {
	async function onSubmit(e) {
		e.preventDefault()

		let userData = Object.fromEntries(new FormData(e.target))
		if (!userData.email || !userData.password || !userData.repeatPass) {
			return alert('All fields are mandatory!')
		} else if (userData.password !== userData.repeatPass) {
			return alert('Password don\'t match')
		}
		let registerRequest = await authServices.register(userData)
		context.page.redirect('/')
	}


	context.renderView(registerTemplate(onSubmit))
}