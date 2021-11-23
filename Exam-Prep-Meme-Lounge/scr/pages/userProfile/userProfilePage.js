import memeServices from "../../services/memeServices.js";
import { userProfileTemplate } from "./userProfileTemplate.js";

async function showPage(context) {
    let user = {
        username: sessionStorage.getItem('username'),
        email: sessionStorage.getItem('email'),
        gender: sessionStorage.getItem('gender'),
        userId: sessionStorage.getItem('userId'),
    }
    let userMemes = await memeServices.getUserMemes(user.userId)
    console.log(userMemes);
    user.userMemes = userMemes;
	let resultTemplate = userProfileTemplate(user, userMemes);
	context.renderView(resultTemplate);
}

export default {
	showPage,
};
