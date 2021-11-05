import posts from "./posts.js";

function createTopic() {
	let form = document.querySelector("body > div.container > main > div.new-topic-border > form");

	form.addEventListener("submit", (e) => {
		e.preventDefault();
		const data = new FormData(e.currentTarget);
		onPost(data);
		posts.loadPosts();
		e.currentTarget.reset();
	});

	let cancelBtn = document.querySelector(
		"body > div.container > main > div.new-topic-border > form > div.new-topic-buttons > button.cancel"
	);
	cancelBtn.addEventListener("click", (e) => {
		e.preventDefault();
		e.currentTarget.parentNode.parentNode.reset();
	});
}

function getDate() {
	var today = new Date();
	var date = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
	var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
	var dateTime = date + " " + time;
	return dateTime;
}

function onPost(data) {
	if (!data.get("topicName") || !data.get("username") || !data.get("postText")) {
		return;
	}

	const body = {
		topicName: data.get("topicName"),
		username: data.get("username"),
		postText: data.get("postText"),
		date: getDate(),
	};
	fetch("http://localhost:3030/jsonstore/collections/myboard/posts", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(body),
	})
		.then((res) => res.json())
		.then((data) => {
			console.log(data);
			posts.loadPosts();
		})
		.catch((err) => {
			console.error(data.message);
		});
}

export default {
	createTopic,
    getDate
};
