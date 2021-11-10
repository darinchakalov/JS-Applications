import { html } from '../node_modules/lit-html/lit-html.js'

export const cardTemplate = (cat) => html`<li>
	<img src="./images/${cat.imageLocation}.jpg" width="250" height="250" alt="Card image cap" />
	<div class="info">
		<button @click=${onClick} class="showBtn">Show status code</button>
		<div class="status" style="display: none" id="${cat.id}">
			<h4>Status Code: ${cat.statusCode}</h4>
			<p>${cat.statusMessage}</p>
		</div>
	</div>
</li>`;

function onClick(e) {
    e.preventDefault();
    let currentBtn = e.target
    let parentDiv = e.target.parentNode;
    let hiddenDiv = parentDiv.querySelector('.status')

    currentBtn.textContent = currentBtn.textContent === 'Show status code' ? 'Hide status code' : 'Show status code'
    hiddenDiv.style.display = hiddenDiv.style.display === 'block' ? 'none' : 'block'
}