function showCurrentView(element) {
	let viewsSection = document.querySelector("#view-section");
	viewsSection.innerHTML = "";
	viewsSection.appendChild(element);
}

function e(type, content, parent, classes, style) {
	let currentElement = document.createElement(type);
	currentElement.textContent = content;
	if (parent) {
		parent.appendChild(currentElement);
	}
	if (classes) {
		classes.split(" ").forEach((c) => {
			currentElement.classList.add(c);
		});
	}
	if (style) {
		currentElement.style = style;
	}
	return currentElement;
}

export default {
	showCurrentView,
	e,
};
