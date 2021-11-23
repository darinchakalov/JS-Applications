import { render } from "../utils.js";


let mainSection = undefined;
let navSection = undefined;

export function initialize(mainSectionElement, navSectionElement){
    mainSection = mainSectionElement;
    navSection = navSectionElement;
}

export function showView(template) {
    render(template, mainSection)
}

export function showNav(template) {
    render(template, navSection)
}

export function renderMiddleware(context, next) {
    context.renderNav = showNav;
    context.renderView = showView;

    next();
}
