import { html } from "../utils.js";

let createTemplate = (onCreate) => html`<h1>Create New Offer</h1>
<p class="message"></p>
<form @submit=${onCreate}>
	<div>
		<input type="text" placeholder="Name...">
	</div>
	<div>
		<input type="text" placeholder="Price...">
	</div>
	<div>
		<input type="text" placeholder="Image url...">
	</div>
	<div>
		<textarea placeholder="Give us some description about this offer..."></textarea>
	</div>
	<div>
		<input type="text" placeholder="Brand...">
	</div>
	<div>
		<button>Create</button>
	</div>
</form>`;

export async function renderCreatePage(context) {
	function onCreate(e) {
		e.preventDefault();

		let createData = Object.fromEntries(new FormData(e.target));
		if ('') {
			return alert("All fields are mandatory!");
		}

		context.page.redirect("/");
	}

	context.renderView(createTemplate(onCreate));
}
