function selectMonth() {
    let allMonthSections = document.querySelectorAll('.monthCalendar')
    allMonthSections.forEach(section => {
        section.addEventListener('click', e => {
            e.preventDefault()
            let currentMonth;
            if (e.target.tagName === 'CAPTION') {
                document.getElementById('years').classList.remove('hide')
                e.currentTarget.classList.add('hide')
            }else if (e.target.tagName === "TD") {
                currentMonth = e.target.children[0].textContent;
            } else if (e.target.tagName === "DIV") {
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
            let currentSection = e.currentTarget
            let currentYear = currentSection.children[0].children[0].textContent
            currentSection.classList.add('hide')
            document.getElementById(`month-${currentYear}-${numberMonth}`).classList.remove('hide')
        })
    });
}

export default{
    selectMonth
}