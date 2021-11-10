import { render } from './node_modules/lit-html/lit-html.js'
import {contacts} from './contacts.js'
import cardTemplate from './templates/cardTemplate.js'


let contactsSection = document.querySelector('#contacts')
let result = contacts.map(cardTemplate)

render(result, contactsSection)