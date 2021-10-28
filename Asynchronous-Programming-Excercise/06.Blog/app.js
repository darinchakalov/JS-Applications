function attachEvents() {
	(async () => {
		let loadBtn = document.querySelector("#btnLoadPosts");
		let viewBtn = document.querySelector("#btnViewPost");
		let postsDropDown = document.querySelector("#posts");
		let title = document.querySelector("#post-title");
		let content = document.querySelector("#post-body");
		let commentsSection = document.querySelector("#post-comments");

		loadBtn.addEventListener("click", (e) => {
			let postsRequest = fetch("http://localhost:3030/jsonstore/blog/posts")
				.then((res) => res.json())
				.then((posts) => {
					Object.keys(posts).forEach((key) => {
						let currentOption = createElement("option", posts[key]["title"], postsDropDown);
						currentOption.value = posts[key]["id"];
					});
				});
		});

		viewBtn.addEventListener("click", (e) => {
			let postID = postsDropDown.value;
            let postRequest = fetch(`http://localhost:3030/jsonstore/blog/posts/${postID}`)
                .then(res => res.json())
                .then(postData => {
                    title.textContent = postData['title']
                    content.textContent = postData['body']
                })
            commentsSection.innerHTML = ''
			let commentsRequest = fetch(`http://localhost:3030/jsonstore/blog/comments`)
				.then((res) => res.json())
				.then((comments) => {
					Object.keys(comments).forEach(key => {
                        if (comments[key]['postId'] === postID) {
                            let currentComment = createElement('li', comments[key]['text'], commentsSection)
                            currentComment.id = comments[key]['id']
                        }
                    });
				});
		});
	})();
}

attachEvents();

function createElement(type, content, parent, className) {
	let el = document.createElement(type);
	el.textContent = content;
	if (parent) {
		parent.appendChild(el);
	}
	if (className) {
		el.classList.add(className);
	}
	return el;
}
