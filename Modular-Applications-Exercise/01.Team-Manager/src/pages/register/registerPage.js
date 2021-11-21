import authServices from "../../services/authServices.js";
import { registerTemplate } from "./registerTemplate.js";
import { verifyInput } from "./verification.js";


async function submitHandler(context, e) {
    e.preventDefault();
	let user = Object.fromEntries(new FormData(e.target));
    if (verifyInput(user) === 'valid') {
        let registerResult = authServices.register(user)
        if (registerResult !== undefined) {
            context.page.redirect('/')
        }
    }
}

function showView(context) {
    let boundSubmitHandler = submitHandler.bind(null, context);
	let form = {
		submitHandler: boundSubmitHandler,
	};
    let templateResult = registerTemplate(form)
    context.renderView(templateResult)
}

export default {
    showView
}