import elements from "../elements.js";
import createPage from "../pages/createPage.js";
import dashboardPage from "../pages/dashboardPage.js";
import homePage from "../pages/homePage.js";
import loginPage from "../pages/loginPage.js";
import registerPage from "../pages/registerPage.js";
import authentication from "./authentication.js";

let views = {
	"home-link": homePage,
	"dashboard-link": dashboardPage,
	"create-link": createPage,
	"login-link": loginPage,
	"register-link": registerPage,
};

function initiliaze() {
	let allLinks = document.querySelectorAll(".link");
	allLinks.forEach((link) => {
		link.addEventListener("click", changeView);
	});
}

async function changeView(e) {
	e.preventDefault();
	let linkId = e.target.id;
	if (views.hasOwnProperty(linkId)) {
		let view = await views[linkId].getView();
		authentication.setMenu()
		elements.showCurrentView(view)
	}
}

let viewChanger = {
	initiliaze,
};

export default viewChanger;
