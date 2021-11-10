import { html, render } from "../node_modules/lit-html/lit-html.js";

import { towns } from "./towns.js";

search();

function search() {
	const townsDiv = document.querySelector("#towns");
	const searchBtn = document.querySelector("body > article > button");

	let result = html` <ul>
		${towns.map((town) => html`<li>${town}</li>`)}
	</ul>`;

	render(result, townsDiv);

	searchBtn.addEventListener("click", findInList);
}

function findInList() {
	let list = document.querySelectorAll("li");
	const inputField = document.querySelector("#searchText");
	const resultDiv = document.querySelector("#result");
	let matches = 0;

	for (const town of list) {
		if (town.textContent.includes(inputField.value)) {
			town.classList.add("active");
			matches++;
		} else {
			town.classList.remove("active");
		}
	}
	resultDiv.textContent = `${matches} matches found`;
}
