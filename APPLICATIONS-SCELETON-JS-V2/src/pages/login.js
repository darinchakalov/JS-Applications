import authServices from "../services/authServices.js";
import { html } from "../utils.js";

let loginTemplate = (onSubmit) => html``;

export function renderLoginPage(context) {
	async function onSubmit(e) {
		e.preventDefault()
		
		let userData = Object.fromEntries(new FormData(e.target))
		if (!userData.username || !userData.password) {
			return alert('All fields are required!')
		}

		let loginRequest = await authServices.login(userData)
		context.page.redirect('/')
	}

	context.renderView(loginTemplate(onSubmit))
}
