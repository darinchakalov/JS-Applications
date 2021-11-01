const loginForm = document.querySelector("body > main > article > form");

loginForm.addEventListener("submit", (e) => {
	e.preventDefault();
	const data = new FormData(loginForm);

	onLogin(data);
});

function onLogin(data) {
	const body = {
		email: data.get("email"),
		password: data.get("password"),
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
					window.location.pathname = "Remote-Data-and-Authentication-Lab/index.html";
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
