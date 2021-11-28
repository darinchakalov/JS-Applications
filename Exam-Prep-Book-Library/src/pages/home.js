import bookSerices from "../services/bookSerices.js";
import { html } from "../utils.js";

let homeTemplate = (books) => html`<section id="dashboard-page" class="dashboard">
	<h1>Dashboard</h1>
	<!-- Display ul: with list-items for All books (If any) -->
	${books.length > 0 ?  html`<ul class="other-books-list">
		${books.map(singleBookTemplate)}
        </ul>
    ` : noBooksTemplate()}
    
    
	<!-- Display paragraph: If there are no books in the database -->
	
</section>`;

let singleBookTemplate = (book) => html`<li class="otherBooks">
	<h3>${book.title}</h3>
	<p>Type: ${book.type}</p>
	<p class="img"><img src=${book.imageUrl} /></p>
	<a class="button" href="/details/${book._id}">Details</a>
</li>`;

let noBooksTemplate = () => html`<p class="no-books">No books in database!</p>`
  
export async function renderHomePage(context) {
    let books = await bookSerices.getAllBooks()
	context.renderView(homeTemplate(books));
}
