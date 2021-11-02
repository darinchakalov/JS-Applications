function selectMonth() {
	let allMonthSections = document.querySelectorAll(".monthCalendar");
	let currentMonth;
	allMonthSections.forEach((el) => {
		el.addEventListener("click", (e) => {
			e.preventDefault();
			if (e.target.tagName == "TD") {
				currentMonth = e.target.children[0].textContent;
			} else if (e.target.tagName == "DIV") {
				currentMonth = e.target.textContent;
			}
			let numberMonth;
			switch (currentMonth) {
				case "Jan":
					numberMonth = 1;
					break;
				case "Feb":
					numberMonth = 2;
					break;
				case "Mar":
					numberMonth = 3;
					break;
				case "Apr":
					numberMonth = 4;
					break;
				case "May":
					numberMonth = 5;
					break;
				case "Jun":
					numberMonth = 6;
					break;
				case "Jul":
					numberMonth = 7;
					break;
				case "Aug":
					numberMonth = 8;
					break;
				case "Sept":
					numberMonth = 9;
					break;
				case "Oct":
					numberMonth = 10;
					break;
				case "Nov":
					numberMonth = 11;
					break;
				case "Dec":
					numberMonth = 12;
					break;
			}
			let currentTable = e.target.parentNode.parentNode.parentNode;
			let currentYear = currentTable.querySelector("caption").textContent;
            //e.target.parentNode.parentNode.parentNode.parentNode.classList.add('hide')
            //document.getElementById(`month-${currentYear}-${numberMonth}`).classList.remove('hide')
		});
	});
}

export default {
	selectMonth,
};
