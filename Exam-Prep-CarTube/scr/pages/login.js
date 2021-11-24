import authServices from "../services/authServices.js";
import { html } from "../utils.js";

let loginTemplate = (onSubmit) => html` <section id="login">
	<div class="container">
		<form @submit=${onSubmit} id="login-form" action="#" method="post">
			<h1>Login</h1>
			<p>Please enter your credentials.</p>
			<hr />

			<p>Username</p>
			<input placeholder="Enter Username" name="username" type="text" />

			<p>Password</p>
			<input type="password" placeholder="Enter Password" name="password" />
			<input type="submit" class="registerbtn" value="Login" />
		</form>
		<div class="signin">
			<p>Dont have an account? <a href="/register">Sign up</a>.</p>
		</div>
	</div>
</section>`;

export function renderLoginPage(context) {
	async function onSubmit(e) {
		e.preventDefault()
		
		let userData = Object.fromEntries(new FormData(e.target))
		if (!userData.username || !userData.password) {
			return alert('All fields are required!')
		}

		let loginRequest = await authServices.login(userData)
		context.page.redirect('/home')
	}

	context.renderView(loginTemplate(onSubmit))
}
