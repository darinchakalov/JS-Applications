import views from './views.js'
import years from './years.js'
import months from './months.js'


views.hideAllSections()
views.showYearSection()
years.selectYear()
months.selectMonth()

let allSections = document.querySelectorAll('caption')
allSections.forEach(caption => {
    caption.addEventListener('click', e =>{
        let goToSection = e.target.textContent
        console.log(goToSection);
        if (goToSection == '2020 - 2023') {
            return
        }else if (goToSection.lengh === 4) {
            console.log(e.target.parentNode);
        } else{

        }
    })
});

