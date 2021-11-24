import { del, get, post, put } from "../api/requester.js";

async function getAllCars() {
	let getCarsRequest = await get("/data/cars?sortBy=_createdOn%20desc");
	return getCarsRequest;
}

async function getSingleCar(id) {
	let getCarRequest = await get(`/data/cars/${id}`);
	return getCarRequest;
}

async function createListing(carData) {
	let createRequest = await post("/data/cars", carData);
	return createRequest;
}

async function editListing(id, carData) {
	let editRequest = await put(`/data/cars/${id}`, carData);
	return editRequest;
}

async function getUserListings(id) {
	let getUserListingsRequest = await get(`/data/cars?where=_ownerId%3D%22${id}%22&sortBy=_createdOn%20desc`)
	return getUserListingsRequest;
}

async function searchListings(year) {
	let searchRequest = await get(`/data/cars?where=year%3D${year}`);
	console.log(searchRequest);
	return searchRequest;
}

async function deleteListing(id) {
	let deleteRequest = await del(`/data/cars/${id}`);
	return deleteRequest;
}

export default {
	getAllCars,
	getSingleCar,
	createListing,
	editListing,
	getUserListings,
	deleteListing,
	searchListings,
};
