import { get, del, post} from '../helpers/dataGenerator.js'

export async function getAllIdeas() {
	let uri = '/data/ideas?select=_id%2Ctitle%2Cimg&sortBy=_createdOn%20desc'
	let request = await get(uri);
	return request;
}

export async function getIdea(id) {
	let uri = `/data/ideas/${id}`;
	let request = await get(uri);
	return request;
}

export async function deleteIdea(id) {
	let uri = `/data/ideas/`+id;
	let request = await del(uri);
	return request;
}

export async function createIdea(idea) {
	let uri = `/data/ideas`;
	let request = await post(uri, idea);
	return request;
}
