import authServices from "../../services/authServices.js"
import { homeTemplate } from "./homeTemplate.js"

function showView(context) {
    let loggedIn = authServices.isLoggedIn()
    context.renderView(homeTemplate(loggedIn))
}

export default {
    showView
}