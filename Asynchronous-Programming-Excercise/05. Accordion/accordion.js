function solution() {
	let mainSection = document.querySelector("#main");

	fetch("http://localhost:3030/jsonstore/advanced/articles/list")
		.then((response) => response.json())
		.then((result) => {
			result.forEach((el) => {
				let accorditionDiv = createElement("div", null, mainSection, "accordition");
				let headDiv = createElement("div", null, accorditionDiv, "head");
				let title = createElement("span", el.title, headDiv);
				let moreBtn = createElement("button", "More", headDiv, "button");
				moreBtn.id = el._id;
				let extraDiv = createElement("div", null, accorditionDiv, "extra");
				moreBtn.addEventListener("click", (e) => {
					fetch(`http://localhost:3030/jsonstore/advanced/articles/details/${el._id}`)
						.then((response) => response.json())
						.then((data) => {
							let paragraph = createElement("p", data.content, extraDiv);
                            e.target.textContent = e.target.textContent === 'More' ? 'Less' : 'More'
                            extraDiv.style.display = extraDiv.style.display === 'block' ? 'none' : 'block'
						});
				});
			});
		});
}

window.addEventListener("load", () => {
	solution();
});

function createElement(type, content, parent, className) {
	let el = document.createElement(type);
	el.textContent = content;
	if (parent) {
		parent.appendChild(el);
	}
	if (className) {
		el.classList.add(className);
	}
	return el;
}
