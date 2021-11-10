export function setMenu() {
	if (sessionStorage.getItem("authToken")) {
		[...document.getElementsByClassName("userNav")].forEach((e) => {
			e.classList.remove("hidden");
		});
		[...document.getElementsByClassName("guestNav")].forEach((e) => {
			e.classList.add("hidden");
		});
	} else {
		[...document.getElementsByClassName("userNav")].forEach((e) => {
			e.classList.add("hidden");
		});
		[...document.getElementsByClassName("guestNav")].forEach((e) => {
			e.classList.remove("hidden");
		});
	}
}

export function isAuthorized() {
	if (sessionStorage.getItem("authToken")) {
		return true;
	} else {
		return false;
	}
}

export function setAuthenticationData(data) {
    sessionStorage.setItem('authToken', data.accessToken)
    sessionStorage.setItem('userEmail', data.email)
    sessionStorage.setItem('userID', data._id)
}

export function removeAuthenticationData() {
    sessionStorage.clear()
}
