import dataGenerator from "./dataGenerator.js";

async function hasIdeas() {
	const response = await dataGenerator.get("/data/ideas?select=_id%2Ctitle%2Cimg&sortBy=_createdOn%20desc");
	return response.length;
}

async function ideasCall() {
	const response = await dataGenerator.get("/data/ideas?select=_id%2Ctitle%2Cimg&sortBy=_createdOn%20desc");
	return response;
}

async function getIdeaDetails(id) {
	const response = await dataGenerator.get("/data/ideas/" + id);
	return response;
}

export default {
	hasIdeas,
	ideasCall,
	getIdeaDetails,
};
