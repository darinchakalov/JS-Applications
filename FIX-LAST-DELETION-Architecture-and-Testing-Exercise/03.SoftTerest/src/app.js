import createPage from "./pages/createPage.js";
import dashboardPage from "./pages/dashboardPage.js";
import homePage from "./pages/homePage.js";
import loginPage from "./pages/loginPage.js";
import registerPage from "./pages/registerPage.js";
import viewChanger from "./handlers/viewChanger.js";
import elements from "./elements.js";
import detailsPage from "./pages/detailsPage.js";
import authentication from "./handlers/authentication.js";

setup();

async function setup() {
	authentication.setMenu();
	
	//Get the main div containing all the sections
	let viewsSection = document.querySelector("#view-section");

	//Get all sections
	homePage.setSection(document.querySelector("#home"));
	loginPage.setSection(document.querySelector("#login"));
	registerPage.setSection(document.querySelector("#register"));
	createPage.setSection(document.querySelector("#create"));
	dashboardPage.setSection(document.querySelector("#dashboard-holder"));
	detailsPage.setSection(document.querySelector('#details'))
	viewChanger.initiliaze();

	//Show the home section
	let homePageSection = await homePage.getView();
	elements.showCurrentView(homePageSection);

	let logoutBtn = document.querySelector('#logout-link')
	logoutBtn.addEventListener('click', authentication.onLogout)
}
