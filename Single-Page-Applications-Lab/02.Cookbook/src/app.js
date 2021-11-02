import catalog from "./catalog.js";
import create from "./create.js";
import login from "./login.js";
import register from "./register.js";

window.addEventListener("load", () => {
	setNav();

	let navMenu = document.querySelector("body > header > nav");

	let buttons = {
		loginBtn: login,
		registerBtn: register,
		catalogBtn: catalog,
		logoutBtn: logout,
        createBtn: create,
	};
	setNavigation();
	catalog.showPage();

	function setNavigation() {
		navMenu.addEventListener("click", (e) => {
			e.preventDefault();
			if (e.target.tagName === "A") {
				let currenView = buttons[e.target.id];
				if (currenView) {
					if (typeof currenView === "object") {
                        currenView.showPage();
                        setNav()
					} else {
                        currenView();
                        setNav()
					}
				}
			}
		});
	}

	function setNav() {
		if (sessionStorage.getItem("authToken") != null) {
			document.getElementById("user").style.display = "inline-block";
			document.getElementById("guest").style.display = "none";
		} else {
			document.getElementById("user").style.display = "none";
			document.getElementById("guest").style.display = "inline-block";
		}
	}

	function logout() {
		const response = fetch("http://localhost:3030/users/logout", {
			method: "get",
			headers: {
				"X-Authorization": sessionStorage.getItem("authToken"),
			},
		})
			.then((response) => {
				if (response.status == 204) {
					sessionStorage.removeItem("authToken");
					setNav();
					catalog.showPage();
				}
			})
			.catch((err) => {
				console.error(data.message);
			});
	}
});
