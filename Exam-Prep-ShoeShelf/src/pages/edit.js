import { html } from "../utils.js";

let editTemplate = (onEdit) => html`<h1>Edit Offer</h1>
<p class="message"></p>
<form>
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
		<button>Edit</button>
	</div>
</form>`;

export async function renderEditPage(context) {
	let carId = context.params.id;

	function onEdit(e) {
		e.preventDefault();

		let editData = Object.fromEntries(new FormData(e.target));
		if ('') {
			return alert("All fields are mandatory!");
		}
		context.page.redirect("/");
	}
	context.renderView(editTemplate( onEdit));
}
