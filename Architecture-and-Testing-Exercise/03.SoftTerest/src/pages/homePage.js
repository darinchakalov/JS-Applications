import { showSection } from "../elements/dom.js"

const homePage = document.querySelector('#home')

export function showHomePage() {
	showSection(homePage)
}