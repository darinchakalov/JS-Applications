let loadBooksBtn = document.querySelector("#loadBooks");
let createForm = document.querySelector("body > form");
let baseUrl = "http://localhost:3030/jsonstore/collections/books";
let tableBody = document.querySelector("body > table > tbody");



createForm.addEventListener("submit", (e) => {
	e.preventDefault();
    let data = new FormData(createForm);
    onCreate(data);
	e.currentTarget.reset();
});

loadBooksBtn.addEventListener("click", (e) => {
	e.preventDefault();
	onLoad();
});

function onCreate(data) {
	let title = data.get("title");
	let author = data.get("author");
	if (!title || !author) {
		return;
	}
	let body = {
		author: author,
		title: title,
	};
	fetch(baseUrl, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
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
function onLoad() {
	fetch(baseUrl)
		.then((res) => res.json())
		.then((data) => {
			tableBody.innerHTML = "";
			Object.keys(data).forEach((key) => {
				let book = data[key];
				let row = createElement("tr", null, tableBody);
				row.id = key;
				let title = createElement("td", book["title"], row);
				let author = createElement("td", book["author"], row);
				let buttonsCell = createElement("td", null, row);
				let editBtn = createElement("button", "Edit", row);
				let deleteBtn = createElement("button", "Delete", row);

				editBtn.addEventListener("click", (e) => {
					e.preventDefault();
					let formName = document.querySelector("body > form > h3");
					let formTitle = document.querySelector("body > form > input[type=text]:nth-child(3)");
					let formAuthor = document.querySelector("body > form > input[type=text]:nth-child(5)");
					let submitBtn = document.querySelector("body > form > button");

					formName.textContent = "Edit FORM";
					submitBtn.textContent = "Save";
					formTitle.value = title.textContent;
					formAuthor.value = author.textContent;

					submitBtn.addEventListener("click", (e) => {
						e.preventDefault();
						if (!formTitle.value || !formAuthor.value) {
							return
						}
						fetch(baseUrl + `/${key}`, {
							method: "PUT",
							headers: { "Content-Type": "application/json" },
							body: JSON.stringify({
								author: formAuthor.value,
								title: formTitle.value,
							}),
						})
							.then((res) => res.json())
							.then((data) => {
								console.log(data);
							})
							.catch((err) => {
								console.error(data.message);
							});
					});
				});
                deleteBtn.addEventListener('click', e => {
                    e.preventDefault()
                    fetch(baseUrl+`/${key}`, {
                        method: 'DELETE'
                    })
                    .then(res => res.json())
                    .then(data =>{
                        e.target.parentNode.remove()
                    })
                    .catch(err => {
                        console.error(data.message);
                    })
                })
			});
		})
		.catch((err) => {
			console.error(data.message);
		});
}
function createElement(type, content, parent) {
	let current = document.createElement(type);
	current.textContent = content;
	if (parent) {
		parent.appendChild(current);
	}
	return current;
}
