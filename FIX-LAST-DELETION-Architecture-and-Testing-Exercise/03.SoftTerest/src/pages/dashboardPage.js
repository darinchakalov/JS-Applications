import elements from "../elements.js";
import dashBoardService from "../services/dashBoardService.js";
import detailsPage from "./detailsPage.js";

let section;

function setSection(domElement) {
	section = domElement;
}

function getSection() {
	return section
}

async function getView() {
	let hasIdeas = await dashBoardService.hasIdeas();
	section.innerHTML = "";
	if (hasIdeas > 0) {
		renderIdeas();
	} else {
		elements.e("h2", "No ideas yet! Be the first one :)", section);
	}
	buttonClick(section)
	return section;
}

async function renderIdeas() {
	
	let response = await dashBoardService.ideasCall();
	for (const key in response) {
		createIdea(response[key]);
	}
}

function createIdea(data) {
	let cardStyle = "width: 20rem; height: 18rem;";
	let cardDiv = elements.e("div", null, section, "card overflow-hidden current-card details", cardStyle);
	let cardBody = elements.e("div", null, cardDiv, "card-body");
	let cardTitle = elements.e("p", data["title"], cardBody, "card-text");
	let image = elements.e("img", null, cardDiv, "card-image");
	image.src = data["img"];
	image.alt = "Card image cap";
	let detailsBtn = elements.e("button", "Details", cardDiv, "btn");
	detailsBtn.id = data["_id"];
}

function buttonClick(section) {
	section.addEventListener("click", async(e) => {
		e.preventDefault();
		if (e.target.tagName === "BUTTON") {
			elements.showCurrentView(await detailsPage.getView(e.target.id))
		}
	});
}

let dashboardPage = {
	setSection,
	getView,
	getSection
};

export default dashboardPage;
