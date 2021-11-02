import catalog from "./catalog.js";

let loginSection = document.getElementById("loginView");

function showPage() {
	document.querySelectorAll("section").forEach((s) => {
		s.classList.add("hide");
	});
	loginSection.classList.remove("hide");
	loginUser();
}

function loginUser() {
	let email = document.querySelector("#loginView > article > form > label:nth-child(1) > input[type=text]");
	let password = document.querySelector("#loginView > article > form > label:nth-child(2) > input[type=password]");
	let loginBtn = document.querySelector("#loginView > article > form > input[type=submit]");

	loginBtn.addEventListener("click", (e) => {
		e.preventDefault();
		if (!email.value || !password.value) {
			return console.error("Please fill email and password");
		}
		onLogin(email.value, password.value);
	});
}

function onLogin(email, password) {
	let body = {
		email: email,
		password: password,
	};
	fetch("http://localhost:3030/users/login", {
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
                    sessionStorage.setItem('userId', data._id);
					catalog.showPage();
					document.getElementById("user").style.display = "inline-block";
					document.getElementById("guest").style.display = "none";
				});
			} else {
				response.json().then((data) => {
					console.log(data.message);
				});
			}
		})
		.catch((error) => {
			console.error("Error:", error);
		});
}

export default {
	showPage,
	loginUser,
};
