import { page } from "./utils.js";

import { initialize, renderMiddleware } from "./helpers/renderMiddleware.js";
import allMemesPage from "./pages/allMemes/allMemesPage.js";
import createPage from "./pages/create/createPage.js";
import homePage from "./pages/home/homePage.js";
import loginPage from "./pages/login/loginPage.js";
import registerPage from "./pages/register/registerPage.js";
import authServices from "./services/authServices.js";
import navView from "./views/nav/navView.js";
import memeDetailsPage from "./pages/memeDetails/memeDetailsPage.js";
import editPage from "./pages/edit/editPage.js";
import userProfilePage from "./pages/userProfile/userProfilePage.js";

let mainSection = document.querySelector("#root");
let navSection = document.querySelector("#navSection");
let notificationsContainer = document.querySelector('#notifications')

initialize(mainSection, navSection, notificationsContainer);

page(renderMiddleware);

//Set / and index.html redirects here
page.redirect("/", "/home");
page.redirect("/index.html", "/home");
//Set pages routing here

if (authServices.isLoggedIn()) {
	page.redirect("/home", "/allMemes");
} else {
	page("/home", navView.showView, homePage.showPage);
}
page("/login", navView.showView, loginPage.showPage);
page("/register", navView.showView, registerPage.showPage);
page("/allMemes", navView.showView, allMemesPage.showPage);
page("/create", navView.showView, createPage.showPage);
page("/myProfile", navView.showView, userProfilePage.showPage);
page("/details/:id", navView.showView, memeDetailsPage.showPage);
page("/edit/:id", navView.showView, editPage.showPage);
page("/logout", async (context) => {
	await authServices.logout();
	context.page.redirect("/home");
});

page.start();
