let logoutBtn = document.querySelector("#user");
let cachesSection = document.querySelector("#main");
cachesSection.style.display = "none";
let loadBtn = document.querySelector("#home-view > aside > button");
let catchesDiv = document.querySelector("#catches");
let userData = await getUserDetails();
let addForm = document.querySelector("#addForm");

if (sessionStorage.getItem("authToken") != null) {
	document.querySelector("#login").style.display = "none";
	document.querySelector("#register").style.display = "none";
	document.querySelector("#addForm > fieldset > button").disabled = false;
	let user = document.querySelector("body > header > nav > p > span");
	user.textContent = userData["email"];

	addForm.addEventListener("submit", (e) => {
		e.preventDefault();
		let formData = new FormData(e.currentTarget);
		onAdd(formData);
		e.currentTarget.reset();
	});
} else {
	logoutBtn.style.display = "none";
}

loadBtn.addEventListener("click", onLoad);

logoutBtn.addEventListener("click", (e) => {
	e.preventDefault();
	onLogout();
});

function onAdd(data) {
	if (
		!data.get("angler") ||
		!data.get("weight") ||
		!data.get("species") ||
		!data.get("location") ||
		!data.get("bait") ||
		!data.get("captureTime")
	) {
		return;
	}
	fetch("http://localhost:3030/data/catches", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"X-Authorization": sessionStorage.getItem("authToken"),
		},
		body: JSON.stringify({
			angler: data.get("angler"),
			weight: data.get("weight"),
			species: data.get("species"),
			location: data.get("location"),
			bait: data.get("bait"),
			captureTime: data.get("captureTime"),
		}),
	})
		.then((res) => res.json())
		.then((data) => {
			console.log(data);
		})
		.catch((err) => {
			console.error(data.message);
		});
}

async function getUserDetails() {
	let response = await fetch("http://localhost:3030/users/me", {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			"X-Authorization": sessionStorage.getItem("authToken"),
		},
	});
	const responceData = await response.json();
	return responceData;
}

function onLoad(e) {
	e.preventDefault();
	fetch("http://localhost:3030/data/catches")
		.then((res) => res.json())
		.then((data) => {
			catchesDiv.innerHTML = "";
			data.forEach((entry) => {
				cachesSection.style.display = "inline";
				let catchDiv = createElement("div", null, catchesDiv, "catch");
				let anglerLable = createElement("label", "Angler", catchDiv);
				let anglerInput = createElement("input", null, catchDiv, "angler", "text", entry["angler"]);
				let weigthLable = createElement("label", "Weight", catchDiv);
				let weightInput = createElement("input", null, catchDiv, "weight", "number", entry["weight"]);
				let speciesLable = createElement("label", "Species", catchDiv);
				let speciesInput = createElement("input", null, catchDiv, "species", "text", entry["species"]);
				let locationLable = createElement("label", "Location", catchDiv);
				let locationInput = createElement("input", null, catchDiv, "location", "text", entry["location"]);
				let baitLable = createElement("label", "Bait", catchDiv);
				let baitInput = createElement("input", null, catchDiv, "bait", "text", entry["bait"]);
				let timeLable = createElement("label", "Capture Time", catchDiv);
				let timeInput = createElement("input", null, catchDiv, "captureTime", "number", entry["captureTime"]);
				let updateBtn = createElement("button", "Update", catchDiv, "update", null, null, entry["_id"]);
				let deleteBtn = createElement("button", "Delete", catchDiv, "delete", null, null, entry["_id"]);

				if (sessionStorage.getItem("authToken") != null) {
					if (entry["_ownerId"] != userData["_id"]) {
						updateBtn.disabled = true;
						deleteBtn.disabled = true;
					}
				} else {
					updateBtn.disabled = true;
					deleteBtn.disabled = true;
				}

				updateBtn.addEventListener("click", onEdit);
				deleteBtn.addEventListener("click", onDelete);
			});
		});
}

function onEdit(e) {
	e.preventDefault();
	let data = e.target.parentNode.querySelectorAll("input");
	if (!data[0].value || !data[1].value || !data[2].value || !data[3].value || !data[4].value || !data[5].value) {
		return;
	}
	fetch("http://localhost:3030/data/catches/" + e.target.getAttribute("data-id"), {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			"X-Authorization": sessionStorage.getItem("authToken"),
		},
		body: JSON.stringify({
			angler: data[0].value,
			weight: data[1].value,
			species: data[2].value,
			location: data[3].value,
			bait: data[4].value,
			captureTime: data[5].value,
		}),
	})
		.then((res) => res.json())
		.then((data) => {
			console.log(data);
		})
		.catch((err) => {
			console.error(data.message);
		});
}

function onDelete(e) {
	e.preventDefault();
	fetch("http://localhost:3030/data/catches/" + e.target.getAttribute("data-id"), {
		method: "DELETE",
		headers: {
			"X-Authorization": sessionStorage.getItem("authToken"),
		},
	})
		.then((res) => res.json())
		.then((data) => {
			console.log(data);
		})
		.catch((err) => {
			console.error(data.message);
		});
	e.target.parentNode.remove();
}

function onLogout() {
	const response = fetch("http://localhost:3030/users/logout", {
		method: "get",
		headers: {
			"X-Authorization": sessionStorage.getItem("authToken"),
		},
	})
		.then((response) => {
			if (response.status == 204) {
				sessionStorage.removeItem("authToken");
				window.location.pathname = "Remote-Data-and-Authentication-Exercise/05.Fisher-Game/index.html";
			}
		})
		.catch((err) => {
			console.error(data.message);
		});
}
function createElement(type, content, parent, className, inputType, value, id) {
	let current = document.createElement(type);
	current.textContent = content;
	if (parent) {
		parent.appendChild(current);
	}
	if (className) {
		current.classList.add(className);
	}
	if (inputType) {
		current.type = inputType;
	}
	if (value) {
		current.value = value;
	}
	if (id) {
		current.setAttribute("data-id", id);
	}
	return current;
}
