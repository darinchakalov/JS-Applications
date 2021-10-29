const registerForm = document.querySelector("form");

registerForm.addEventListener("submit", (e) => {
	e.preventDefault();
	const data = new FormData(e.currentTarget);
	onRegister(data);
});

async function onRegister(data) {
	if (data.get("password") != data.get("rePass")) {
		return console.error("Passwords don't match");
	}

	let body = {
		email: data.get("email"),
		password: data.get("password"),
	};
	try {
		const response = await fetch("http://localhost:3030/users/register", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(body),
		});
		const responseData = await response.json();
		if (response.status === 200) {
			sessionStorage.setItem("authToken", responseData.accessToken);
            window.location.pathname = 'Remote-Data-and-Authentication-Lab/index.html'
		} else {
			throw new Error(responseData.message);
		}
	} catch (err) {
		console.error(err.message);
	}
}
