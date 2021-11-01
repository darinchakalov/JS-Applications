// window.addEventListener("load", registration);
function registration() {
	document.querySelector("#logout").style.display = "none";

	let notification = document.querySelector("#register > p");
	let email = document.querySelector("#register > label:nth-child(1) > input[type=text]");
	let password = document.querySelector("#register > label:nth-child(2) > input[type=password]");
	let rePass = document.querySelector("#register > label:nth-child(3) > input[type=password]");
	document.querySelector("#register > button").addEventListener("click", (e) => {
		e.preventDefault();
		if (!email.value || !password.value) {
			return (notification.textContent = "All fields must filled!");
		} else if (!validateEmail(email.value)) {
			return (notification.textContent = "Please use a valid email address");
		} else if (password.value != rePass.value) {
			return (notification.textContent = "Passwords need to match!");
		}

		onRegister(email.value, password.value);
	});

	function onRegister(email, password) {
		let body = {
			email: email,
			password: password,
		};
		fetch("http://localhost:3030/users/register", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(body),
		})
			.then((res) => res.json())
			.then((data) => {
				sessionStorage.setItem("authToken", data.accessToken);
                window.location.pathname = "Remote-Data-and-Authentication-Exercise/05.Fisher-Game/index.html";
			})
			.catch((err) => {
				console.error(data.message);
			});
	}
	function validateEmail(email) {
		const re =
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(String(email).toLowerCase());
	}
}
registration()