import { setAuthenticationData, setMenu } from "../authentication.js";
import { showSection } from "../elements/dom.js";
import userServices from "../services/userServices.js";
import { showHomePage } from "./homePage.js";

const registerPage = document.querySelector("#register");
const form = registerPage.querySelector("form");
form.addEventListener("submit", onSubmit);

export function showRegisterPage() {
	showSection(registerPage);
}

async function onSubmit(e) {
	e.preventDefault();
	const formData = new FormData(e.currentTarget);
	if (formData.get("password") !== formData.get("repeatPassword")) {
		return alert(`Passwords should match`);
	}
	const registerData = {
		email: formData.get("email"),
		password: formData.get("password"),
	};
	let data = await userServices.registerRequest(registerData);
	console.log(data.email);
	if (data !== undefined) {
		setAuthenticationData(data);
		form.reset();
		setMenu();
		showHomePage();
	}
}
