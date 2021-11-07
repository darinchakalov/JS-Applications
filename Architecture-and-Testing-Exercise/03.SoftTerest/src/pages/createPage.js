let section;

function setSection(domElement) {
	section = domElement;
}

async function getView() {
	return section;
}

let createPage = {
	setSection,
	getView,
};

export default createPage;
