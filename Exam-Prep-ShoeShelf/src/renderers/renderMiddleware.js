import { render } from "../utils.js";

let mainSection = undefined;

export function initializeMain(mainSectionElement){
    mainSection = mainSectionElement;
}

function renderer(template) {
    render(template, mainSection)
}

export function renderMiddleware(context, next) {
    context.renderView = renderer

    next();
}
