import authentication from "../handlers/authentication.js";
import dashBoardService from "../services/dashBoardService.js";
import elements from "../elements.js";
import onDelete from "../services/deleteService.js";
import dashboardPage from '../pages/dashboardPage.js'

let section;

function setSection(domElement) {
	section = domElement;
}

async function getView(id) {
	let response = await dashBoardService.getIdeaDetails(id);
	section.innerHTML = "";
	renderDetails(response);
	authentication.setMenu();
	buttonClick(section)
	return section;
}

function renderDetails(data) {
	let image = elements.e("img", null, section, "det-img");
	image.src = data["img"];
	let descriptionDiv = elements.e("div", null, section, "desc");
	let descH2 = elements.e("h2", data["title"], descriptionDiv, "display-5");
	let infoP1 = elements.e("p", "Description:", descriptionDiv, "infoType");
	let descriptionP = elements.e("p", data["description"], descriptionDiv, "idea-description");

	let deleteDiv = elements.e("div", null, section, "text-center");
	if (data["_ownerId"] === authentication.getUserId()) {
		let deleteBtn = elements.e("button", "Delete", deleteDiv, "btn detb");
		deleteBtn.value = 'Delete'
		deleteBtn.id = data["_id"];
	}
}

// function buttonClick(section) {
// 	let delBtn = section.querySelector('.btn')
// 	delBtn.addEventListener("click", async(e) => {
// 		e.preventDefault()
// 		const response = await onDelete(e.target.id)
// 		elements.showCurrentView(await dashboardPage.getView());
// 	})
// }

function buttonClick(section) {
	section.addEventListener("click", async(e) => {
		e.preventDefault();
		let allBtns = section.querySelector('.btn')
		if (e.target.tagName === "BUTTON") {
			const response = await onDelete(e.target.id)
			dashboardPage.getSection().innerHTML = ''
			elements.showCurrentView(await dashboardPage.getView());
		}
	});
}

let detailsPage = {
	setSection,
	getView,
};

export default detailsPage;
