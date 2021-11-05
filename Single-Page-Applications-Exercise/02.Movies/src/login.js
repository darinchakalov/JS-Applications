import home from "./home.js";

let loginSection = document.querySelector("#form-login");

function showPage() {
	document.querySelectorAll("section").forEach((s) => {
		s.classList.add("hide");
	});
	loginSection.classList.remove("hide");

	loginUser();
}

function loginUser() {
	let loginForm = document.querySelector("#form-login > form");

	loginForm.addEventListener("submit", (e) => {
		e.preventDefault();
		let formData = new FormData(e.currentTarget);
		onLogin(formData);
	});
}

function onLogin(data) {
	if (!data.get("email") || !data.get("password")) {
		return;
	}
	const body = {
		email: data.get("email"),
		password: data.get("password"),
	};
	fetch("http://localhost:3030/users/login", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(body),
	})
		.then((response) => {
			if (response.status == 200) {
				response.json().then((data) => {
					sessionStorage.setItem("authToken", data.accessToken);
                    sessionStorage.setItem('userEmail', data.email)
					sessionStorage.setItem('userID', data._id)
					loginSection.classList.add("hide");
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
