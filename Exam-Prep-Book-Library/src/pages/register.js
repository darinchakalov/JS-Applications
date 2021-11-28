import authServices from "../services/authServices.js";
import { html } from "../utils.js";

let registerTemplate = (onSubmit) => html`<section id="register-page" class="register">
<form @submit=${onSubmit} id="register-form" action="" method="">
	<fieldset>
		<legend>Register Form</legend>
		<p class="field">
			<label for="email">Email</label>
			<span class="input">
				<input type="text" name="email" id="email" placeholder="Email">
			</span>
		</p>
		<p class="field">
			<label for="password">Password</label>
			<span class="input">
				<input type="password" name="password" id="password" placeholder="Password">
			</span>
		</p>
		<p class="field">
			<label for="repeat-pass">Repeat Password</label>
			<span class="input">
				<input type="password" name="confirm-pass" id="repeat-pass" placeholder="Repeat Password">
			</span>
		</p>
		<input class="button submit" type="submit" value="Register">
	</fieldset>
</form>
</section>`;


export function renderRegisterPage(context) {
	async function onSubmit(e) {
		e.preventDefault()

		let userData = Object.fromEntries(new FormData(e.target))
		console.log(userData);
		if (!userData.email || !userData.password || !userData['confirm-pass']) {
			return alert('All fields are mandatory')
		} else if (userData.password !== userData['confirm-pass']) {
			return alert('Password don\'t match')
		}
		let registerRequest = await authServices.register(userData)
		context.page.redirect('/')
	}


	context.renderView(registerTemplate(onSubmit))
}