const viewsSection = document.querySelector("#view-section");

export function showSection(section) {
	viewsSection.replaceChildren(section);
}

export function e(type, parent, classes, content) {
	const result = document.createElement(type);
	if (parent !== undefined) {
		parent.appendChild(result);
	}
	if (classes) {
		classes.split(" ").forEach((c) => result.classList.add(c));
	}
	if (content) {
		result.textContent = content;
	}

	return result;
}
