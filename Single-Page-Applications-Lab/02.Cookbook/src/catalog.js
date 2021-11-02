import e from "./elements.js";

let catalogSection = document.getElementById("catalogView");

function getRecipes() {
	fetch("http://localhost:3030/data/recipes/")
		.then((res) => res.json())
		.then((data) => {
			createCatalogDefaultView(data);
		});
}

function createCatalogDefaultView(data) {
	data.forEach((r) => {
		let recipe = e("article", null, catalogSection, "preview", r["_id"]);
		let titleDiv = e("div", null, recipe, "title");
		let titleH2 = e("h2", r["name"], titleDiv);
		let imgDiv = e("div", null, recipe, "small");
		let img = e("img", null, imgDiv);
		img.src = r["img"];

		recipe.addEventListener("click", recipeExtendedView);
	});
}
function createCatalogExtendedView(data, recipe) {
	const userId = sessionStorage.getItem("userId");
	let title = e("h2", data["name"], recipe);
	let mainDiv = e("div", null, recipe, "band");
	let thumbDiv = e("div", null, mainDiv, "thumb");
	let img = e("img", null, thumbDiv);
	img.src = data["img"];

	let ingDiv = e("div", null, mainDiv, "ingredients");
	let ingH3 = e("h3", "Ingredients:", ingDiv);
	let ingUl = e("ul", null, ingDiv);
	data["ingredients"].forEach((ing) => {
		e("li", ing, ingUl);
	});
	let descDiv = e("div", null, recipe, "description");
	let descH3 = e("h3", "Preparation:", descDiv);
	data["steps"].forEach((step) => {
		e("p", step, descDiv);
	});

	if (userId == data["_ownerId"]) {
		let buttonsDiv = e("div", null, recipe, "controls");
		let editBtn = e("button", "\u270E Edit", buttonsDiv);
		let delBtn = e("button", "\u2716 Delete", buttonsDiv);

		editBtn.addEventListener("click", onEdit);
		delBtn.addEventListener("click", onDelete);
	}
}
function onEdit(e) {
	e.preventDefault();
	let article = e.currentTarget.parentNode.parentNode;
	console.log(article.id);
	fetch("http://localhost:3030/data/recipes/" + article.id)
		.then((res) => res.json())
		.then((data) => {
			document.querySelector("#editView > article > form > label:nth-child(1) > input[type=text]").value =
				data["name"];
			document.querySelector("#editView > article > form > label:nth-child(2) > input[type=text]").value =
				data["img"];
			document.querySelector("#editView > article > form > label:nth-child(3) > textarea").value =
				data["ingredients"].join("\n");
			document.querySelector("#editView > article > form > label:nth-child(4) > textarea").value =
				data["steps"].join("\n");
		});

	document.querySelectorAll("section").forEach((s) => {
		s.classList.add("hide");
	});
	catalogSection.innerHTML = "";
	document.querySelector("#editView").classList.remove("hide");

	let articleName = document.querySelector("#editView > article > form > label:nth-child(1) > input[type=text]");
	let image = document.querySelector("#editView > article > form > label:nth-child(2) > input[type=text]");
	let ingredients = document.querySelector("#editView > article > form > label:nth-child(3) > textarea");
	let preparation = document.querySelector("#editView > article > form > label:nth-child(4) > textarea");
	let submitBtn = document.querySelector("#editView > article > form > input[type=submit]");

	submitBtn.addEventListener("click", (e) => {
		e.preventDefault();
		let body = {
			name: articleName.value,
			img: image.value,
			ingredients: ingredients.value
				.split("\n")
				.map((l) => l.trim())
				.filter((l) => l != ""),
			steps: preparation.value
				.split("\n")
				.map((l) => l.trim())
				.filter((l) => l != ""),
		};
		console.log(body);
		fetch("http://localhost:3030/data/recipes/" + article.id, {
			method: "PUT",
			headers: {
				"X-Authorization": sessionStorage.getItem("authToken"),
			},
			body: JSON.stringify(body),
		})
			.then((res) => res.json())
			.then((data) => {
                showPage()
				console.log(data);
			})
			.catch((err) => {
				console.error(data.message);
			});
	});
}

function onDelete(e) {
	e.preventDefault();
	let article = e.currentTarget.parentNode.parentNode;
	fetch("http://localhost:3030/data/recipes/" + article.id, {
		method: "DELETE",
		headers: {
			"X-Authorization": sessionStorage.getItem("authToken"),
		},
	})
		.then((res) => res.json())
		.then((data) => {
			article.remove()
			console.log(data);
		})
		.catch((err) => {
			console.error(data.message);
		});
}

function recipeExtendedView(e) {
	e.preventDefault();
	let recipe = e.currentTarget;
	recipe.classList.remove("preview");
	recipe.innerHTML = "";
	fetch("http://localhost:3030/data/recipes/" + recipe.id)
		.then((res) => res.json())
		.then((data) => {
			createCatalogExtendedView(data, recipe);
		});
}

function showPage() {
	document.querySelectorAll("section").forEach((s) => {
		s.classList.add("hide");
	});
	catalogSection.innerHTML = "";
	getRecipes();
	catalogSection.classList.remove("hide");
}

export default {
	showPage,
	getRecipes,
	recipeExtendedView,
};
