import page from "../node_modules/page/page.mjs";
import createPage from "./pages/create/createPage.js";
import dashboardPage from "./pages/dashboard/dashboardPage.js";
import detailsPage from "./pages/details/detailsPage.js";
import editPage from "./pages/edit/editPage.js";
import loginPage from "./pages/login/loginPage.js";
import myFurniturePage from "./pages/my-furniture/my-furniturePage.js";
import nav from "./pages/nav/nav.js";
import registerPage from "./pages/register/registerPage.js";
import renderingMiddleware from "./rendering/renderingMiddleware.js";
import authService from "./services/authService.js";

renderingMiddleware.initialize(document.querySelector("#viewContainer"), document.querySelector("header"));

page("/", renderingMiddleware.decorateContext, nav.showView, dashboardPage.showView);
page("/dashboard", renderingMiddleware.decorateContext, nav.showView, dashboardPage.showView);
page("/login", renderingMiddleware.decorateContext, nav.showView, loginPage.showView);
page("/register", renderingMiddleware.decorateContext, nav.showView, registerPage.showView);
page("/logout", async (context) => {await authService.logout(); page.redirect("/dashboard");
});
page("/details/:id", renderingMiddleware.decorateContext, nav.showView, detailsPage.showView);
page("/create", renderingMiddleware.decorateContext, nav.showView, createPage.showView);
page("/edit/:id", renderingMiddleware.decorateContext, nav.showView, editPage.showView);
page("/my-furniture", renderingMiddleware.decorateContext, nav.showView, myFurniturePage.showView);

page.start();
