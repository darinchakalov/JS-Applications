import home from "./home.js";

let registerSection = document.querySelector("#form-sign-up");

function showPage() {
	document.querySelectorAll("section").forEach((s) => {
		s.classList.add("hide");
	});
	registerSection.classList.remove("hide");
	registerUser();
}

function registerUser() {
	let registerForm = document.querySelector("#form-sign-up > form");

	registerForm.addEventListener("submit", (e) => {
		e.preventDefault();
		let formData = new FormData(e.currentTarget);

		registration(formData);
	});
}

function registration(data) {
	if (!data.get("email") || !data.get("password") || !data.get("repeatPassword")) {
		return;
	}
	const body = {
		email: data.get("email"),
		password: data.get("password"),
	};
	fetch("http://localhost:3030/users/register", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(body),
	})
		.then((response) => {
			if (response.status == 200) {
				response.json().then((data) => {
					sessionStorage.setItem("authToken", data.accessToken);
					sessionStorage.setItem("userEmail", data.email);
					sessionStorage.setItem("userID", data._id);
					registerSection.classList.add("hide");
					home.showPage();
				});
			} else {
				response.json().then((data) => {
					console.log(data.message);
				});
			}
		})
		.catch((err) => {
			console.error("Error:", err);
		});
}

export default {
	showPage,
};
