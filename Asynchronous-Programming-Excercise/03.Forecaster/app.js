function attachEvents() {
	let location = document.querySelector("#location");
	let getBtn = document.querySelector("#submit");
	let currentSection = document.querySelector("#current");
	let upcommingSection = document.querySelector("#upcoming");
	let forecastSection = document.querySelector("#forecast");

	let degrees = "&#176";
	let symbol;
	getBtn.addEventListener("click", (e) => {
		e.preventDefault();

		fetch(`http://localhost:3030/jsonstore/forecaster/locations`)
			.then((res) => res.json())
			.then((locations) => {
				let currentLocation = locations.find((l) => l["name"] === location.value);
				let currentCode = currentLocation["code"];
				fetch(`http://localhost:3030/jsonstore/forecaster/today/${currentCode}`)
					.then((res) => res.json())
					.then((data) => {
						forecastSection.style.display = "block";
						let forecastDiv = creatElement("div", null, currentSection, "forecasts");
						let conditionSymbol = creatElement("span", null, forecastDiv, "condition");
						conditionSymbol.classList.add("symbol");
						switch (data["forecast"]["condition"]) {
							case "Sunny":
								symbol = "&#x2600;";
								break;
							case "Partly sunny":
								symbol = "&#x26C5";
								break;
							case "Overcast":
								symbol = "&#x2601";
								break;
							case "Rain":
								symbol = "&#x2614";
								break;
						}
						conditionSymbol.innerHTML = symbol;
						let conditionSpan = creatElement("span", null, forecastDiv, "condition");
						let locationSpan = creatElement("span", `${data["name"]}`, conditionSpan, "forecast-data");
						let temperature = creatElement("span", null, conditionSpan, "forecast-data");
						temperature.innerHTML = `${data["forecast"]["low"]}${degrees}/${data["forecast"]["high"]}${degrees}`;
						let weatherSpan = creatElement("span", data["forecast"]["condition"], conditionSpan);
					})
					.catch((err) => {
						currentSection.textContent = "Error";
						forecastSection.style.display = "block";
					});
				fetch(`http://localhost:3030/jsonstore/forecaster/upcoming/${currentCode}`)
					.then((res) => res.json())
					.then((data) => {
						let forecastDiv = creatElement("div", null, upcommingSection, "forecast-info");
						data["forecast"].forEach((day) => {
							let upcomingSpan = creatElement("span", null, forecastDiv, "upcoming");
							let symbolSpan = creatElement("span", null, upcomingSpan, "symbol");
							switch (day["condition"]) {
								case "Sunny":
									symbol = "&#x2600;";
									break;
								case "Partly sunny":
									symbol = "&#x26C5";
									break;
								case "Overcast":
									symbol = "&#x2601";
									break;
								case "Rain":
									symbol = "&#x2614";
									break;
							}
							symbolSpan.innerHTML = symbol;
							let temperature = creatElement("span", null, upcomingSpan, "forecast-data");
							temperature.innerHTML = `${day["low"]}${degrees}/${day["high"]}${degrees}`;
                            let weatherSpan = creatElement("span", day["condition"], upcomingSpan);
						});
					});
			})
			.catch((err) => {
				currentSection.textContent = "Error";
				forecastSection.style.display = "block";
			});
	});
	function creatElement(type, content, parrent, className) {
		let current = document.createElement(type);
		current.textContent = content;
		if (parrent) {
			parrent.appendChild(current);
		}
		if (className) {
			current.classList.add(className);
		}
		return current;
	}
}

attachEvents();
