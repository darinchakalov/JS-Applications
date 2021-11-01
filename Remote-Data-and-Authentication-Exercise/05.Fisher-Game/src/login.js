if (sessionStorage.getItem("authToken") != null) {
	document.querySelector("#login").style.display = "none";
	document.querySelector("#register").style.display = "none";
	let user = document.querySelector("body > header > nav > p > span");
	fetch("http://localhost:3030/users/me", {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			"X-Authorization": sessionStorage.getItem("authToken"),
		},
	})
		.then((res) => res.json())
		.then((data) => {
			user.textContent = data["email"];
		});
} else {
    document.querySelector("#login").style.display='none'
    document.querySelector("#logout").style.display='none'
	let email = document.querySelector("#login > label:nth-child(1) > input[type=text]");
	let password = document.querySelector("#login > label:nth-child(2) > input[type=password]");
	let notifications = document.querySelector("#login > p");
	let loginBtn = document.querySelector("#login > button");
	loginBtn.addEventListener("click", (e) => {
        e.preventDefault()
		if (!email.value) {
			return (notifications.textContent = "Please fill in an email address");
		} else if (!password.value) {
			return (notifications.textContent = "Please fill in an password");
		}
		onLogin(email.value, password.value);
	});
}

let logoutBtn = document.querySelector("#user")
logoutBtn.addEventListener('click', e =>{
    e.preventDefault()
    onLogout()
})

function onLogout() {
	const response = fetch('http://localhost:3030/users/logout', {
        method: 'get',
        headers: {
            'X-Authorization': sessionStorage.getItem('authToken')
        },
    })
	.then(response => {
		if (response.status == 204) {
			sessionStorage.removeItem('authToken')
			window.location.pathname = 'Remote-Data-and-Authentication-Exercise/05.Fisher-Game/index.html'
		}
	})
	.catch(err => {
		console.error(data.message)
	})
}

function onLogin(email, password) {
	const body = {
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
					window.location.pathname = "Remote-Data-and-Authentication-Exercise/05.Fisher-Game/index.html";
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
