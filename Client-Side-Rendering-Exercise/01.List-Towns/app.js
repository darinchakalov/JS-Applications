import { html, render } from "../node_modules/lit-html/lit-html.js";

window.addEventListener("load", () => {
	const rootSection = document.querySelector("#root");
	const townsInput = document.querySelector("#towns");
	const loadBtn = document.querySelector("#btnLoadTowns");

	loadBtn.addEventListener("click", onLoad);

	function onLoad(e) {
		e.preventDefault();
		const towns = townsInput.value.split(", ");
		if (towns.length > 0 && towns[0] !== '') {
			let result = html` <ul>
				${towns.map((town) => html`<li>${town}</li>`)}
			</ul>`;
			render(result, rootSection);
		}
	}
});
