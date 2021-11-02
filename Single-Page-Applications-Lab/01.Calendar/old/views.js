function hideAllSections() {
    let allSections = document.querySelectorAll('section')
    allSections.forEach(section => {
        section.classList.add('hide')
    });
}
function showYearSection() {
    document.querySelector("#years").classList.remove('hide')
}



export default {
    hideAllSections,
    showYearSection,
}