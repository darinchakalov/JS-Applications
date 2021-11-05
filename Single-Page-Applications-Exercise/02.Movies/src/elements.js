export default function e(type, content, parent, classes) {
	let current = document.createElement(type);
	current.textContent = content;
	if (parent) {
		parent.appendChild(current);
	}
	if (classes) {
		classes.split(' ').forEach(c => {
            current.classList.add(c)
        });
	}
	return current;
}
