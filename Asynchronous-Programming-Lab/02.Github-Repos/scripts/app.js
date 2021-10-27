function loadRepos() {
	let baseUrl = "https://api.github.com/users";
	let userInput = document.querySelector("#username");
	let reposUl = document.querySelector("#repos");

	reposUl.innerHTML = "";

	fetch(baseUrl + `/${userInput.value}/repos`)
		.then((response) => response.json())
		.then((data) =>
			data.forEach((repo) => {
				let currentLi = document.createElement("li");
				let repoName = document.createElement("a");
				repoName.textContent = repo["full_name"];
				repoName.href = repo["html_url"];
				currentLi.appendChild(repoName);
				reposUl.appendChild(currentLi);
			})
		)
		.catch((error) => errorHandling(error));

	function errorHandling(error) {
		let currentLi = document.createElement("li");
		currentLi.textContent = error		
		reposUl.appendChild(currentLi);
	}
}
