import { render } from "../node_modules/lit-html/lit-html.js";
import { allStudentsTemplate } from "./template.js";

const endpoint = "http://localhost:3030/jsonstore/advanced/table";
const table = document.querySelector("tbody");
const searchField = document.querySelector("#searchField");

let students = [];

populateTable();
document.querySelector("#searchBtn").addEventListener("click", onClick);

function onClick() {
	let searchText = searchField.value.toLowerCase();
	let allStudents = students.map((s) => Object.assign({}, s));
	let matchedStudents = allStudents.filter((s) =>
		Object.values(s).some((val) => {
			return val.toLowerCase().includes(searchText);
		})
	);
	matchedStudents.forEach((s) => (s.class = "select"));

	searchField.value = "";
	render(allStudentsTemplate(allStudents), table);
}

async function populateTable() {
	const request = await fetch(endpoint);
	const data = await request.json();
	students = Object.values(data).map((s) => ({
		name: `${s.firstName} ${s.lastName}`,
		course: s.course,
		email: s.email,
	}));

	render(allStudentsTemplate(students), table);
}