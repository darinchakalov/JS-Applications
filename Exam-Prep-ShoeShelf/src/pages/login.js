import authServices from "../services/authServices.js";
import { html } from "../utils.js";

let loginTemplate = (onSubmit) => html`<h1>Login</h1>
<p class="form-info">Don't have account?
	<a href="/register">Register now</a> and fix that!
</p>
<form @submit=${onSubmit} action="">
	<div>
		<input type="email" name='email' placeholder="Email...">
	</div>

	<div>
		<input type="password" name="password" placeholder="Password...">
	</div>
	<div> 
		<button type="submit">Login</button>
	</div>
</form>`;

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
