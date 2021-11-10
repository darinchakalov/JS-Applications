import elements from '../elements.js';
import createCall from '../services/createService.js'
import dashboardPage from './dashboardPage.js'

let section;

function setSection(domElement) {
	section = domElement;
}

async function getView() {
	return section;
}

create()
function create(){
	let createForm = document.querySelector("#create > div > form")
	createForm.addEventListener('submit', onSubmit)
}

async function onSubmit(e) {
	e.preventDefault()
	let createData = new FormData(e.currentTarget)
	let response = await createCall(createData);
	e.target.reset();
	elements.showCurrentView(await dashboardPage.getView());
}

let createPage = {
	setSection,
	getView,
};

export default createPage;
