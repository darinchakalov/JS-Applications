import authServices from "../services/authServices.js";
import { html } from "../utils.js";

let loginTemplate = (onSubmit) => html`<section id="login-page" class="login">
	<form @submit=${onSubmit} id="login-form" action="" method="">
		<fieldset>
			<legend>Login Form</legend>
			<p class="field">
				<label for="email">Email</label>
				<span class="input">
					<input type="text" name="email" id="email" placeholder="Email" />
				</span>
			</p>
			<p class="field">
				<label for="password">Password</label>
				<span class="input">
					<input type="password" name="password" id="password" placeholder="Password" />
				</span>
			</p>
			<input class="button submit" type="submit" value="Login" />
		</fieldset>
	</form>
</section>`;

export function renderLoginPage(context) {
	async function onSubmit(e) {
		e.preventDefault();

		let userData = Object.fromEntries(new FormData(e.target));
		if (!userData.email || !userData.password) {
			return alert("All fields are required!");
		}

		let loginRequest = await authServices.login(userData);
		context.page.redirect("/dashboard");
	}

	context.renderView(loginTemplate(onSubmit));
}
