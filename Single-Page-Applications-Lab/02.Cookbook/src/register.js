import catalog from './catalog.js'

let registerSection = document.getElementById("registerView");

function showPage() {
	document.querySelectorAll("section").forEach((s) => {
		s.classList.add("hide");
	});
	registerSection.classList.remove("hide");
	registerUser();
}

function registerUser() {
	let email = document.querySelector("#registerView > article > form > label:nth-child(1) > input[type=text]");
	let password = document.querySelector("#registerView > article > form > label:nth-child(2) > input[type=password]");
	let rePass = document.querySelector("#registerView > article > form > label:nth-child(3) > input[type=password]");
	let regBtn = document.querySelector("#registerView > article > form > input[type=submit]");

	regBtn.addEventListener("click", e =>{
        e.preventDefault()
        onRegister(email.value, password.value, rePass.value)
    });
}

async function onRegister(email, password, rePass) {
	if (!email) {
		console.error("Valid email should be provided");
	}
	if (password != rePass) {
		return console.error("Passwords don't match");
	}

	let body = {
		email: email,
		password: password,
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
            sessionStorage.setItem('userId', data._id);
            registerSection.classList.add('hide')
            email =''
            password = ''
            rePass = ''
            catalog.showPage()
            document.getElementById("user").style.display = "inline-block";
			document.getElementById("guest").style.display = "none";
        } else {
			throw new Error(responseData.message);
		}
	} catch (err) {
		console.error(err.message);
	}
}

export default {
	showPage,
};
