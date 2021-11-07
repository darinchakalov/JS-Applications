import authentication from "../handlers/authentication.js";
import dashBoardService from "../services/dashBoardService.js";
let section;

function setSection(domElement) {
	section = domElement;
}

async function getView(id) {
	console.log('ok');
    // let response = await dashBoardService.getIdeaDetails(id)
	authentication.setMenu()
	return section;
}



let detailsPage = {
	setSection,
	getView,
};

export default detailsPage;
