import catalog from "./catalog.js";

let createSection = document.querySelector("#createView");

function showPage() {
	document.querySelectorAll("section").forEach((s) => {
		s.classList.add("hide");
	});
	createSection.classList.remove("hide");
	createRecipe();
}

function createRecipe() {
	let form = document.querySelector("#createView > article > form")

	form.addEventListener("submit", (e) => {
		let data = new FormData(e.currentTarget);

		onCreate(data);
		e.currentTarget.reset();
	});
}

function onCreate(data) {
	const body = {
		name: data.get("name"),
		img: data.get("img"),
		ingredients: data
			.get("ingredients")
			.split("\n")
			.map((l) => l.trim())
			.filter((l) => l != ""),
		steps: data
			.get("steps")
			.split("\n")
			.map((l) => l.trim())
			.filter((l) => l != ""),
	};

	if (sessionStorage.getItem("authToken") === null) {
		return catalog.showPage()
	}

	fetch("http://localhost:3030/data/recipes", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"X-Authorization": sessionStorage.getItem("authToken"),
		},
		body: JSON.stringify(body),
	})
		.then((res) => res.json())
		.then((data) => {
			console.log(data);
		})
		.catch((err) => {
			console.error(data.message);
		});
}

export default {
	showPage,
};
