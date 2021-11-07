import elements from "../elements.js";
import registrationCall from "../services/registerService.js";
import homePage from "./homePage.js";

let section;

function setSection(domElement) {
	section = domElement;
}

async function getView() {
    return section;
}

onRegister()
async function onRegister() {
    const registrationForm = document.querySelector("#register > div > form")
    registrationForm.addEventListener('submit', onSubmit)
}

async function onSubmit(e) {
    e.preventDefault()
    let regData = new FormData(e.currentTarget)
    let response = registrationCall(regData)
    e.currentTarget.reset()
    elements.showCurrentView(await homePage.getView())
}


let registerPage = {
	setSection,
	getView,
};

export default registerPage;
