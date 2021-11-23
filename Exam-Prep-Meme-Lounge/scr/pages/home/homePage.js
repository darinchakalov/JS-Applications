import { homeTemplate } from "./homeTemplate.js";


function showPage(context) {
    let resultTemplate = homeTemplate();
    context.renderView(resultTemplate);
}

export default {
    showPage
}