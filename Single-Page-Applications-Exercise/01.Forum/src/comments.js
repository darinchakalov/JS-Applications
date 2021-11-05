import e from "./element.js";
import create from "./create.js";
import posts from "./posts.js";

let containerDiv = document.querySelector('.topic-container')
let postSection = document.querySelector("#posts-section");
let postExpandSection = document.querySelector("#post-expand");
let commentsSection = document.querySelector("body > div.container > main > div.topic-title > div > div.comment")
let postCommentSection = document.querySelector("#post-comment");

export default function postExpand(e) {
	e.preventDefault();
	let currentPostID = e.currentTarget.id;

	getPost(currentPostID);
	getComments(currentPostID);
}

function getComments(id, postDiv) {
	fetch("http://localhost:3030/jsonstore/collections/myboard/comments")
		.then((res) => res.json())
		.then((data) => {
			for (const key in data) {
				if (data[key]["postID"] === id) {
					let commentDiv = e("div", null, postDiv, "user-comment");
					let nameWrapperDiv = e("div", null, commentDiv, "topic-name-wrapper");
					let topicNameDiv = e("div", null, nameWrapperDiv, "topic-name");
					let headP = e("p", null, topicNameDiv);
					headP.innerHTML = `<strong>${data[key]["username"]}</strong> commented on <time>${data[key]["date"]}</time>`;
					let contentDiv = e("div", null, topicNameDiv, "post-content");
					let contentP = e("p", data[key]["content"], contentDiv);
				}
			}
		});
}

function postNewComment(data, postDiv) {
	// let commentDiv = e("div", null, containerDiv, "comment");

	let answerCommentDiv = e("div", null, containerDiv, "answer-comment");
	let answerP = e("p", null, answerCommentDiv);
	answerP.innerHTML = `<span>currentUser</span> <span> comment:</span>`;
	let answerDiv = e("div", null, answerCommentDiv, "answer");
	let commentForm = e("form", null, answerDiv);
	let commentText = e("textarea", null, commentForm);
	commentText.name = "postText";
	commentText.id = "comment";
	commentText.cols = "30";
	commentText.rows = "10";
	let formDiv = e("div", null, commentForm);
	let userLabel = e("label", null, formDiv);
	userLabel.for = "username";
	userLabel.innerHTML = `Username <span class="red">*</span>`;
	let textInput = e("input", null, formDiv);
	textInput.type = "text";
	textInput.name = "username";
	textInput.id = "username";

	let postBtn = e("button", "Post", commentForm);
	commentForm.addEventListener("submit", (e) => {
		e.preventDefault();
		let formData = new FormData(e.currentTarget);

		newPost(formData, data["_id"], postDiv);
		getComments(data["_id"], postDiv)
		e.currentTarget.reset();
	});
}

function newPost(data, id, postDiv) {
	console.log(postDiv);
	if (!data.get("postText") || !data.get("username")) {
		return;
	}
	const body = {
		username: data.get("username"),
		content: data.get("postText"),
		date: create.getDate(),
		postID: id,
	};
	fetch("http://localhost:3030/jsonstore/collections/myboard/comments", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(body),
	})
		.then((res) => res.json())
		.then((data) => {
			getComments(data["_id"], postDiv);
			console.log(data);
		})
		.catch((err) => {
			console.error(data.message);
		});
}

function getPost(id) {
	fetch("http://localhost:3030/jsonstore/collections/myboard/posts/" + id)
		.then((res) => res.json())
		.then((data) => {
			document.querySelector(".new-topic-border").classList.add("hide");
			postSection.classList.add("hide");
			let titleDiv = e("div", null, containerDiv, "theme-title");
			let themeNameWrapper = e("div", null, titleDiv, "theme-name-wrapper");
			let themeName = e("div", null, themeNameWrapper, "theme-name");
			let titleH2 = e("h2", data["topicName"], themeName);

			let postDiv = e("div", null, containerDiv, "comment");
			let headerDiv = e("div", null, postDiv, "header");
			let image = e("img", null, headerDiv);
			image.src = "./static/profile.png";
			image.alt = "avatar";
			let headP = e("p", null, headerDiv);
			headP.innerHTML = `<span>${data["username"]}</span> posted on <time>${data["date"]}</time>`;
			let contentDiv = e("p", data["postText"], headerDiv, "post-content");
			postNewComment(data, postDiv);
			getComments(id, postDiv)
		});
}
