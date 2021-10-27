function loadCommits() {
	let username = document.querySelector("#username");
	let repo = document.querySelector("#repo");
	let commitsUl = document.querySelector("#commits");

	let status;
    commitsUl.innerHTML = ''

	fetch(`https://api.github.com/repos/${username.value}/${repo.value}/commits`)
		.then((response) => {
			if (response.status !== 200) {
				status = response.status;
			}
			return response.json();
		})
		.then((data) => {
			if (data.message == "Not Found") {
				createElement("li", `Error: ${status} ${data.message}`, commitsUl);
				return;
			}

			data.forEach((commit) => {
				createElement("li", `${commit["commit"]["author"]["name"]}: ${commit["commit"]["message"]}`, commitsUl);
			});
		})
		.catch((error) => console.log(error));

	function createElement(type, content, parrent) {
		let current = document.createElement(type);
		current.textContent = content;
		if (parrent) {
			parrent.appendChild(current);
		}
		return current;
	}
}
