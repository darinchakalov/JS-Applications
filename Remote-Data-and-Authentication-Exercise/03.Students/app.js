let form = document.querySelector("#form");
let baseUrl = "http://localhost:3030/jsonstore/collections/students";
let table = document.querySelector("#results > tbody");

form.addEventListener("submit", (e) => {
	e.preventDefault();
	let formData = new FormData(e.currentTarget);

	onSubmit(formData);
	e.currentTarget.reset()
});

function onSubmit(data) {
	let firstName = data.get("firstName");
	let lastName = data.get("lastName");
	let facultyNumber = data.get("facultyNumber");
	let grade = data.get("grade");
	if (!firstName || !lastName || !facultyNumber || !grade) {
		return;
	}
	let body = {
		firstName: firstName,
		lastName: lastName,
		facultyNumber: facultyNumber,
		grade: grade,
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

	fetch(baseUrl)
		.then((res) => res.json())
		.then((data) => {
            table.innerHTML =''
			Object.keys(data).forEach((key) => {
				let student = data[key];
                let test = createElement('tr', null, table)
                let first = createElement('td', student['firstName'], test)
                let last = createElement('td', student['lastName'], test)
                let facNum = createElement('td', student['facultyNumber'], test)
                let grade =  createElement('td', student['grade'], test)

			});
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
