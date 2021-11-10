import dataGenerator from "./dataGenerator.js";

export default async function onDelete(id) {
	const response = dataGenerator.del(`/data/ideas/${id}`);
	return response;
}
