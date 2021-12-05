import { page } from "./utils.js";

import { initializeNav, naviagationMiddleware } from "./renderers/navigationMiddleware.js";
import { initializeMain, renderMiddleware } from "./renderers/renderMiddleware.js";
import { renderHomePage } from "./pages/home.js";
import { renderLoginPage } from "./pages/login.js";
import { renderRegisterPage } from "./pages/register.js";

let mainSection = document.getElementById("mainSection");
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
page('/login', renderLoginPage)
page('/register', renderRegisterPage)

page.start();
