export default function selectYear() {
	let yearSection = document.querySelector(".yearsCalendar");
	let currentYear;
	yearSection.addEventListener("click", (e) => {
		e.preventDefault();
		if (e.target.tagName === "TD") {
			currentYear = e.target.children[0].textContent;
		} else if (e.target.tagName === "DIV") {
			currentYear = e.target.textContent;
		}
		document.getElementById(`year-${currentYear}`).classList.remove("hide");
		yearSection.classList.add("hide");
	});
}
