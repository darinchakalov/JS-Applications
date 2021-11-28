import { renderCreatePage } from "./pages/create.js";
import { renderDetailsPage } from "./pages/details.js";
import { renderEditPage } from "./pages/edit.js";
import { renderHomePage } from "./pages/home.js";
import { renderLoginPage } from "./pages/login.js";
import { renderMyBooksPage } from "./pages/my-books.js";
import { renderRegisterPage } from "./pages/register.js";
import { initializeNav, naviagationMiddleware } from "./renderers/navigationMiddleware.js";
import { initializeMain, renderMiddleware } from "./renderers/renderMiddleware.js";
import { page } from "./utils.js";

let mainSection = document.getElementById("site-content");
let navSection = document.getElementById("site-header");

initializeMain(mainSection);
initializeNav(navSection);

// page(naviagationMiddleware);
page(renderMiddleware);

//Set / and index.html redirects here
page.redirect("/", "/dashboard");
page.redirect("/index.html", "/dashboard");

//Set pages routing here
page("/dashboard", naviagationMiddleware, renderMiddleware, renderHomePage);
page("/login", naviagationMiddleware, renderLoginPage);
page("/register", naviagationMiddleware, renderRegisterPage);
page("/create", naviagationMiddleware, renderCreatePage);
page("/my-books", naviagationMiddleware, renderMyBooksPage);
page("/details/:id", naviagationMiddleware, renderDetailsPage);
page("/edit/:id", naviagationMiddleware, renderEditPage);

page.start();
