import { page } from "./utils.js";

import { initializeNav, naviagationMiddleware } from "./renderers/navigationMiddleware.js";
import { initializeMain, renderMiddleware } from "./renderers/renderMiddleware.js";
import { renderHomePage } from "./pages/home.js";
import { renderLoginPage } from "./pages/login.js";
import { renderRegisterPage } from "./pages/register.js";
import { renderCatalogPage } from "./pages/catalog.js";
import { renderCreatePage } from "./pages/create.js";
import { renderDetailsPage } from "./pages/details.js";
import { renderEditPage } from "./pages/edit.js";


let mainSection = document.getElementById("main-content"); 
let navSection = document.getElementById("navSection");

initializeMain(mainSection);
initializeNav(navSection);


page(renderMiddleware);
page(naviagationMiddleware);

//Set / and index.html redirects here
page.redirect('/', '/home')
page.redirect('/index.html', '/home')

//Set pages routing here
page('/home', renderHomePage)
page('/login', renderLoginPage)
page('/register', renderRegisterPage)
page('/catalog', renderCatalogPage)
page('/create', renderCreatePage)
page('/details/:id', renderDetailsPage)
page('/edit/:id', renderEditPage)

page.start();
