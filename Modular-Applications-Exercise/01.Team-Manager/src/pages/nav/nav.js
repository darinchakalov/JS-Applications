import authServices from "../../services/authServices.js";
import { navTemplate } from "./navTemplate.js";


function showView(context) {
    let navInfo = {
        isLoggedIn: authServices.isLoggedIn(),
        currentPage: context.pathname
    }
    let templateResult = navTemplate(navInfo)
    return templateResult;
}

export default {
    showView
}