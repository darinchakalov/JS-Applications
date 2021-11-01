function attachEvents() {
	let phonebookUL = document.querySelector("#phonebook");
	let loadBtn = document.querySelector("#btnLoad");
	let name = document.querySelector("#person");
	let phoneNumber = document.querySelector("#phone");
	let createBtn = document.querySelector("#btnCreate");

	let baseUrl = "http://localhost:3030/jsonstore/phonebook";

	loadBtn.addEventListener("click", (e) => {
		e.preventDefault();
		fetch(baseUrl)
			.then((res) => res.json())
			.then((data) => {
				phonebookUL.innerHTML = "";
				Object.keys(data).forEach((key) => {
					let current = data[key];
					let phoneLi = createElement(
						"li",
						`${current["person"]}: ${current["phone"]}`,
						phonebookUL,
						current["_id"]
					);
					let deleteBtn = createElement("button", "Delete", phoneLi);

					deleteBtn.addEventListener("click", (e) => {
						e.preventDefault();
						let id = e.target.parentNode.id;
						fetch(baseUrl + `/${id}`, {
							method: "DELETE",
						})
							.then((res) => res.json())
							.then((data) => {
								console.log(data);
							})
							.catch((err) => {
								console.error(data.message);
							});
						e.target.parentNode.remove();
					});
				});
			})
			.catch((err) => {
				console.error(data.message);
			});
	});

	createBtn.addEventListener("click", (e) => {
		e.preventDefault();
		if (!name.value || !phoneNumber.value) {
			return;
		}
		let body = {
			person: name.value,
			phone: phoneNumber.value,
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
		name.value = "";
		phoneNumber.value = "";
	});

	function createElement(type, content, parent, id) {
		let current = document.createElement(type);
		current.textContent = content;
		current.id = id;
		if (parent) {
			parent.appendChild(current);
		}
		return current;
	}
}

attachEvents();
