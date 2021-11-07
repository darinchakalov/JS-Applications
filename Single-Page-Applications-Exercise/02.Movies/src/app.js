import home from "./home.js";
import login from "./login.js";
import logout from "./logout.js";
import register from "./register.js";
import addMovie from './addMovie.js'



window.addEventListener("load", () => {
	home.showPage()

	let navBar = document.querySelector(".navbar");

	let buttons = {
		home: home,
		logout: logout,
		login: login,
		register: register,
	};
	setNavigation();

	function setNavigation() {
		navBar.addEventListener("click", (e) => {
			e.preventDefault();
			if (e.target.tagName === "A") {
				let currentView = buttons[e.target.id];
				currentView.showPage()
			}
		});
	}
});
