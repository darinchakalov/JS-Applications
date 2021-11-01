function attachEvents() {
	let messagesArea = document.querySelector("#messages");
	let name = document.querySelector("#controls > input[type=text]:nth-child(2)");
	let messageBox = document.querySelector("#controls > input[type=text]:nth-child(5)");
	let sendBtn = document.querySelector("#submit");
	let refreshBtn = document.querySelector("#refresh");

	let messagesURL = "http://localhost:3030/jsonstore/messenger";

	sendBtn.addEventListener("click", (e) => {
		e.preventDefault();
		fetch(messagesURL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				author: name.value,
				content: messageBox.value,
			}),
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
			})
			.catch((err) => {
				console.error(data.message);
			});
        name.value=''
        messageBox.value=''
	});
	refreshBtn.addEventListener("click", (e) => {
		e.preventDefault();
		fetch(messagesURL, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res) => res.json())
			.then((data) => {
				let result = [];
				Object.keys(data).forEach((key) => {
					let message = data[key];
					result.push(`${message["author"]}: ${message["content"]}`);
				});
				messagesArea.textContent = result.join("\n");
			})
			.catch((err) => {
				console.error(data.message);
			});
	});
}

attachEvents();
