import { removeAuthenticationData, setMenu } from "./authentication.js";
import { showCreatePage } from "./pages/createPage.js";
import { showDashPage } from "./pages/dashPage.js";
import { showHomePage } from "./pages/homePage.js";
import { showLoginPage } from "./pages/loginPage.js";
import { showRegisterPage } from "./pages/registerPage.js";
import userServices from "./services/userServices.js";

const logoutBtn = document.querySelector("#logoutBtn");
const navBar = document.querySelector(".navbar");
navBar.addEventListener("click", onNavigate);
logoutBtn.addEventListener("click", onLogout);

const sections = {
	homeBtn: showHomePage,
	dashBtn: showDashPage,
	createBtn: showCreatePage,
	loginBtn: showLoginPage,
	registerBtn: showRegisterPage,
};

setMenu();
showHomePage();

document.querySelector("body > nav > div > a");
function onNavigate(e) {
	e.preventDefault();
	if (e.target.tagName === "A" || e.target.parentNode.tagName === "A") {
		let currentBtn = e.target.id;
		if (e.target.tagName === "IMG") {
			currentBtn = e.target.parentNode.id;
		}
		const view = sections[currentBtn];
		if (typeof view === "function") {
			view();
		}
	}
}

async function onLogout(e) {
	e.preventDefault();
	let data = await userServices.logoutRequest()
	if (data !== undefined) {
	    removeAuthenticationData()
	    setMenu()
	}
}
