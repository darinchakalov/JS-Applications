export default function selectMonthView() {
    let allDayCallendars = document.querySelectorAll('.daysCalendar')
    allDayCallendars.forEach(cal => {
        cal.addEventListener('click', e =>{
            e.preventDefault()
            if (e.target.tagName === 'CAPTION') {
                let [month, year] = e.target.textContent.split(' ')
                document.getElementById(`year-${year}`).classList.remove("hide");
                e.currentTarget.classList.add('hide')
            }
        })
    });
}

