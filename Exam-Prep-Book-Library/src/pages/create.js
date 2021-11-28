import bookSerices from "../services/bookSerices.js";
import { html } from "../utils.js";

let createTemplate = (onCreate) => html`<section id="create-page" class="create">
<form @submit=${onCreate} id="create-form" action="" method="">
	<fieldset>
		<legend>Add new Book</legend>
		<p class="field">
			<label for="title">Title</label>
			<span class="input">
				<input type="text" name="title" id="title" placeholder="Title">
			</span>
		</p>
		<p class="field">
			<label for="description">Description</label>
			<span class="input">
				<textarea name="description" id="description" placeholder="Description"></textarea>
			</span>
		</p>
		<p class="field">
			<label for="image">Image</label>
			<span class="input">
				<input type="text" name="imageUrl" id="image" placeholder="Image">
			</span>
		</p>
		<p class="field">
			<label for="type">Type</label>
			<span class="input">
				<select id="type" name="type">
					<option value="Fiction">Fiction</option>
					<option value="Romance">Romance</option>
					<option value="Mistery">Mistery</option>
					<option value="Classic">Clasic</option>
					<option value="Other">Other</option>
				</select>
			</span>
		</p>
		<input class="button submit" type="submit" value="Add Book">
	</fieldset>
</form>
</section>`;

export async function renderCreatePage(context) {
	function onCreate(e) {
		e.preventDefault();

		let createData = Object.fromEntries(new FormData(e.target));
		if (!createData.title || !createData.description || !createData.imageUrl) {
			return alert("All fields are mandatory!");
		}
		let createdBook = bookSerices.createBook(createData)

		context.page.redirect("/");
	}

	context.renderView(createTemplate(onCreate));
}
