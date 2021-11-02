import views from './views.js'
import selectYear from './years.js'
import months from './months.js'
import days from './days.js'
import selectMonthView from './days.js'

views.hideAllSections()
views.showYearSection()

selectYear()
months.selectMonth()

selectMonthView()
