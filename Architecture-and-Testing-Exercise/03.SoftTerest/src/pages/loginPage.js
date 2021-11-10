import { setAuthenticationData, setMenu } from "../authentication.js";
import { showSection } from "../elements/dom.js";
import userServices from "../services/userServices.js";
import { showHomePage } from "./homePage.js";


const loginPage = document.querySelector("#login");
const loginForm = loginPage.querySelector("form");
loginForm.addEventListener("submit", onSubmit);

export function showLoginPage() {
	showSection(loginPage);
}

async function onSubmit(e) {
	e.preventDefault();
	const formData = new FormData(e.currentTarget);
	const loginData = {
		email: formData.get("email"),
		password: formData.get("password"),
	};
	let data = await userServices.loginRequest(loginData)
	console.log(data);
	if (data !== undefined) {
		setAuthenticationData(data)
		loginForm.reset()
		setMenu()
		showHomePage()
	}
}
