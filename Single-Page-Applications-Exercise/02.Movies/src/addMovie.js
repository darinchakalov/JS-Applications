import home from "./home.js";

let addMovieBtn = document.querySelector("#add-movie-button a");
let addMovieSection = document.querySelector("#add-movie");

addMovieBtn.addEventListener("click", (e) => {
	e.preventDefault();
	showPage();
	addNewMovie();
});

function addNewMovie() {
	let newMovieForm = document.querySelector("#add-movie form");

	newMovieForm.addEventListener("submit", (e) => {
		e.preventDefault();
		let newMovieData = new FormData(e.currentTarget);
		postNewMovie(newMovieData);
	});
}

function postNewMovie(data) {
	if (!data.get("title") || !data.get("description") || !data.get("imageUrl")) {
		return;
	}
	const body = {
		title: data.get("title"),
		description: data.get("description"),
		img: data.get("imageUrl"),
	};
	fetch("http://localhost:3030/data/movies", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
			"X-Authorization": sessionStorage.getItem("authToken"),
        },
        body: JSON.stringify(body)
    })
    .then(res => res.json())
    .then(data => {
        home.showPage()
    })
    .catch(err => {
        console.error(data.message);
    })
}

function showPage() {
	document.querySelectorAll("section").forEach((s) => {
		s.classList.add("hide");
	});
	addMovieSection.classList.remove("hide");
}

export default {
	showPage,
};
