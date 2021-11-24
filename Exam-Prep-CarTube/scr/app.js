import { page } from "./utils.js";

import { renderHomePage } from "./pages/home.js";
import { initializeNav, naviagationMiddleware } from "./renderers/navigationMiddleware.js";
import { initializeMain, renderMiddleware } from "./renderers/renderMiddleware.js";
import { renderAllListingsPage } from "./pages/all-listings.js";
import { renderLoginPage } from "./pages/login.js";
import { renderRegisterPage } from "./pages/register.js";
import { renderDetailsPage } from "./pages/details.js";
import { renderCreatePage } from "./pages/create.js";
import { renderEditPage } from "./pages/edit.js";
import { renderMyListingsPage } from "./pages/my-listings.js";
import { renderByYearPage } from "./pages/by-year.js";

let mainSection = document.getElementById("site-content"); //query select the main section here
let navSection = document.getElementById("navSection");

initializeMain(mainSection);
initializeNav(navSection);

page(renderMiddleware);
page(naviagationMiddleware);

//Set / and index.html redirects here
page.redirect("/", "/home");
page.redirect("/index.html", "/home");
//Set pages routing here
page("/home", renderHomePage);
page("/all-listings", renderAllListingsPage);
page("/login", renderLoginPage);
page("/register", renderRegisterPage);
page("/create", renderCreatePage);
page('/my-listings', renderMyListingsPage)
page('/by-year', renderByYearPage)
page("/details/:id", renderDetailsPage);
page("/edit/:id", renderEditPage);

page.start();
