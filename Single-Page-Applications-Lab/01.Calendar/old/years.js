function selectYear() {
    let yearsTable = document.querySelector("#years > table")
    let currentYear;
    yearsTable.addEventListener('click', e =>{
        if (e.target.tagName == 'TD') {
            currentYear = e.target.children[0].textContent
        } else if (e.target.tagName == 'DIV') {
            currentYear = e.target.textContent
        }
        let yearToShow = document.getElementById(`year-${currentYear}`)
        hideYearSection()
        yearToShow.classList.remove('hide')
    })
}

function hideYearSection() {
    document.querySelector("#years").classList.add('hide')
}

export default {
    selectYear
}
