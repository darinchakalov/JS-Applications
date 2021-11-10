import { showSection } from "../elements/dom.js"
import { createIdea } from "../services/ideasServices.js"
import { showDashPage } from "./dashPage.js"

const createPage = document.querySelector('#create')
let form = createPage.querySelector('form')
form.addEventListener('submit', onCreate)

export function showCreatePage() {
	showSection(createPage)
}

async function onCreate(e) {
	e.preventDefault()
	let formData = new FormData(e.currentTarget)
	let idea = {
		title: formData.get('title'),
		description: formData.get('description'),
		img: formData.get('imageURL')
	}
	let response = await createIdea(idea)
	if (response !== undefined) {
		showDashPage()
	}
}