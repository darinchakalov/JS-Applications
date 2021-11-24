import authServices from "../services/authServices.js";
import { html } from "../utils.js";

let registerTemplate = (onSubmit) => html` <section id="register">
	<div class="container">
		<form @submit=${onSubmit} id="register-form">
			<h1>Register</h1>
			<p>Please fill in this form to create an account.</p>
			<hr />

			<p>Username</p>
			<input type="text" placeholder="Enter Username" name="username" required />

			<p>Password</p>
			<input type="password" placeholder="Enter Password" name="password" required />

			<p>Repeat Password</p>
			<input type="password" placeholder="Repeat Password" name="repeatPass" required />
			<hr />

			<input type="submit" class="registerbtn" value="Register" />
		</form>
		<div class="signin">
			<p>Already have an account? <a href="/login">Sign in</a>.</p>
		</div>
	</div>
</section>`;


export function renderRegisterPage(context) {
	async function onSubmit(e) {
		e.preventDefault()

		let userData = Object.fromEntries(new FormData(e.target))
		if (!userData.username || !userData.password || !userData.repeatPass) {
			return alert('All fields are mandatory!')
		} else if (userData.password !== userData.repeatPass) {
			return alert('Password don\'t match')
		}
		let registerRequest = await authServices.register(userData)
		context.page.redirect('/home')
	}


	context.renderView(registerTemplate(onSubmit))
}