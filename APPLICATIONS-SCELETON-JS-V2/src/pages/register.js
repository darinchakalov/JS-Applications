import authServices from "../services/authServices.js";
import { html } from "../utils.js";

let registerTemplate = (onSubmit) => html``;


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
		context.page.redirect('/')
	}


	context.renderView(registerTemplate(onSubmit))
}