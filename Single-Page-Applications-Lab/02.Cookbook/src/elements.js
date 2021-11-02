export default function e(type, content, parent, className, id) {
    let current = document.createElement(type);
		current.textContent = content;
		if (id) {
			current.id = id
		}
		if (parent) {
			parent.appendChild(current);
		}
        if (className) {
            current.classList.add(className)
        }
		return current;
}