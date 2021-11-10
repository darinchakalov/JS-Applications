import { html, render } from '../node_modules/lit-html/lit-html.js'
import { cats } from "./catSeeder.js";
import { cardTemplate } from './cardTemplate.js';

window.addEventListener('load', () => {
    const container = document.querySelector('#allCats');

    const result = html`
    <ul>
        ${cats.map((cat) => cardTemplate(cat))}
    </ul>`

    render(result, container)
})