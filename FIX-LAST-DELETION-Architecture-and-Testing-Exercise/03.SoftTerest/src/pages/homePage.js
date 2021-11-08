import authentication from "../handlers/authentication.js";

let section;

function setSection(domElement) {
	section = domElement;
}

async function getView() {
	authentication.setMenu()
	return section;
}

let homePage = {
	setSection,
	getView,
};

export default homePage;
