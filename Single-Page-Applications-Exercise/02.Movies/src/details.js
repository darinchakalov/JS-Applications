import e from "./elements.js";
import onDelete from "./delete.js";
import onEdit from "./edit.js";
import like from "./like.js";
import userLikes from "./like.js";
import login from "./login.js";

let movieSection = document.querySelector("#movie");
let detailsSection = document.querySelector("#movie-example");

movieSection.addEventListener("click", (e) => {
	e.preventDefault();
	if (e.target.tagName === "BUTTON") {
		let movieId = e.target.getAttribute("data-id");
		detailsSection.innerHTML = "";
		showPage();
		getMovieDetails(movieId);
	}
});

function showPage() {
	document.querySelectorAll("section").forEach((s) => {
		s.classList.add("hide");
	});
	detailsSection.classList.remove("hide");
}

function getMovieDetails(id) {
	fetch("http://localhost:3030/data/movies/" + id)
		.then((res) => res.json())
		.then((data) => {
			detailsRender(data);
		})
		.catch((err) => {
			console.error(err);
		});
}

function detailsRender(data) {
	let container = e("div", null, detailsSection);
	let titleDiv = e("div", null, container, "row bg-light text-dark");
	let titleH1 = e("h1", `Movie title: ${data["title"]}`, titleDiv);
	let imgDiv = e("div", null, titleDiv, "col-md-8");
	let image = e("img", null, imgDiv, "img-thumbnail");
	image.src = data["img"];
	image.alt = "Movie";

	let descriptionDiv = e("div", null, titleDiv, "col-md-4 text-center");
	let descriptionH3 = e("h3", `Movie Desription`, descriptionDiv, "my-3");
	let descriptionP = e("p", data["description"], descriptionDiv);

	if (sessionStorage.getItem("userID") == data["_ownerId"]) {
		let delBtn = e("button", "Delete", descriptionDiv, "btn btn-danger");
		let editBtn = e("button", "Edit", descriptionDiv, "btn btn-warning");

		delBtn.setAttribute("data-id", data["_id"]);
		editBtn.setAttribute("data-id", data["_id"]);

		delBtn.addEventListener("click", (e) => {
			e.preventDefault();
			onDelete(e.target.getAttribute("data-id"));
		});

		editBtn.addEventListener("click", (e) => {
			e.preventDefault();
			onEdit(e.target.getAttribute("data-id"));
		});
	} else if (sessionStorage.getItem("authToken") && sessionStorage.getItem("userID") !== data["_ownerId"]) {
		fetch(
			`http://localhost:3030/data/likes?where=movieId%3D%22${
				data["_id"]
			}%22%20and%20_ownerId%3D%22${sessionStorage.getItem("userID")}%22`
		)
			.then((res) => res.json())
			.then((recived) => {
				if (recived.length == 0) {
					let likeBtn = e("button", "Like", descriptionDiv, "btn btn-primary");
					likeBtn.addEventListener("click", (e) => {
						e.preventDefault();
						like.onLike(data["_id"]);
					});
				} else {
					fetch(`http://localhost:3030/data/likes?where=movieId%3D%22${data["_id"]}%22&distinct=_ownerId&count`)
						.then((res) => res.json())
						.then((data) => {
							e("span", `Liked ${data}`, descriptionDiv, "enrolled-span");
						})
						.catch((err) => console.error(err));
				}
			});
	}
}

export default {
	showPage,
};
