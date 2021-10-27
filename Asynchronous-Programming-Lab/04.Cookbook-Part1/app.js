window.addEventListener("load", () => {
	document.querySelector("body > main > p").remove();
	let mainSection = document.querySelector("body > main");

	fetch("http://localhost:3030/jsonstore/cookbook/recipes")
		.then((res) => res.json())
		.then((data) => {
			for (const recipe in data) {
				let recipeArticle = createElement("article", null, mainSection, "preview");
				let title = createElement("div", null, recipeArticle, "title");
				let titleH2 = createElement("h2", data[recipe]["name"], title);
				let imageDiv = createElement("div", null, recipeArticle, "small");
				let image = createElement("img", null, imageDiv);
				image.src = data[recipe]["img"];

				recipeArticle.addEventListener("click", () => {
					mainSection.innerHTML = "";
					fetch(`http://localhost:3030/jsonstore/cookbook/details/${recipe}`)
						.then((res) => res.json())
						.then((newData) => {
							console.log(newData);
							let recipeArticle = createElement("article", null, mainSection, "preview");
							let title = createElement("h2", newData["name"], recipeArticle);
							let mainDiv = createElement("div", null, recipeArticle, "band");
							let imageDiv = createElement("div", null, mainDiv, "thumb");
							let thumb = createElement("img", null, imageDiv);
							thumb.src = newData["img"];
							let ingredientsDiv = createElement("div", null, mainDiv, "ingredients");
							let ingredientsH3 = createElement("h3", "Ingredients:", ingredientsDiv);
							let ingredientsUL = createElement("ul", null, ingredientsDiv);
							newData["ingredients"].forEach((ingredient) => {
								createElement("li", ingredient, ingredientsUL);
							});
							let descriptionDiv = createElement("div", null, recipeArticle, "description");
                            let descriptionH3 = createElement('h3', 'Preparation:', descriptionDiv)
                            newData['steps'].forEach(step => {
                                createElement('p', step, descriptionDiv)
                            });
						});
				});
			}
		});

	function createElement(type, content, parrent, className) {
		let current = document.createElement(type);
		current.textContent = content;
		if (parrent) {
			parrent.appendChild(current);
		}
		if (className) {
			current.classList.add(className);
		}
		return current;
	}
});
