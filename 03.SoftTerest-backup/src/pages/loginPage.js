import elements from "../elements.js";
import authentication from "../handlers/authentication.js";
import loginCall from "../services/loginService.js";
import homePage from "./homePage.js";

let section;

function setSection(domElement) {
	section = domElement;
}

async function getView() {
	return section;
}

onLogin();
async function onLogin() {
	const loginForm = document.querySelector("#login > div > form");
	loginForm.addEventListener("submit", onSubmit);
}

async function onSubmit(e) {
	e.preventDefault();
	let loginData = new FormData(e.currentTarget);
	let response = loginCall(loginData);
	e.currentTarget.reset();
	elements.showCurrentView(await homePage.getView());
}

let loginPage = {
	setSection,
	getView,
};

export default loginPage;
