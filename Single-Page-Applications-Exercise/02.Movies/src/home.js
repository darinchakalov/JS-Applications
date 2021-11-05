import showMovies from "./showMovies.js";

function showPage() {
	document.querySelectorAll("section").forEach((s) => {
		s.classList.add("hide");
	});
	document.querySelector("#home-page").classList.remove("hide");
	document.querySelector("#movie").classList.remove("hide");

	setNav();
	showMovies.showAllMovies();
}

function setNav() {
	if (sessionStorage.getItem("authToken") !== null) {
		document.querySelector("#welcome").textContent = `Welcome, ${sessionStorage.getItem("userEmail")}`;
		Array.from(document.querySelectorAll(".guest")).forEach((e) => {
			e.style.display = "none";
		});
		Array.from(document.querySelectorAll(".user")).forEach((e) => {
			e.style.display = "inline-block";
		});
		document.querySelector("#add-movie-button").classList.remove("hide");
	} else {
		Array.from(document.querySelectorAll(".guest")).forEach((e) => {
			e.style.display = "inline-block";
		});
		Array.from(document.querySelectorAll(".user")).forEach((e) => {
			e.style.display = "none";
		});
		document.querySelector("#add-movie-button").classList.add("hide");
	}
}

export default {
	showPage,
};
