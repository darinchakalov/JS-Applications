import { html } from "../utils.js";

let detailsTemplate = () => html`<div class="offer-details">
<h1>Under Armour HOVR</h1>
<div class="info">
	<img src="https://i1.t4s.cz/products/3023295-602/under-armour-ua-w-hovr-phantom-se-trek-263676-3023295-603.jpg"
		alt="">
	<div class="description">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facilis explicabo
		voluptatibus odio? Deleniti amet qui tenetur ipsa enim blanditiis laboriosam distinctio, dignissimos
		cupiditate, delectus autem. Explicabo exercitationem voluptatibus reprehenderit repellat. Lorem
		ipsum dolor, sit amet consectetur adipisicing elit. Tempore reiciendis maiores aliquid nobis,
		accusantium dolore iste ipsa atque deserunt corrupti maxime, alias neque libero temporibus expedita
		magni perferendis aut nostrum.
		<br>
		<br>
		<p class="price">$149.99</p>
	</div>
</div>
<div class="actions">
	<a>Edit</a>
	<a>Delete</a>
	<a>Buy</a>
	<span>You bought it</span>
</div>
</div>`;

let owenerTemplate = () => html``;

export async function renderDetailsPage(context) {
	
	context.renderView(detailsTemplate());
}
