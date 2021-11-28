import authServices from "../services/authServices.js";
import bookSerices from "../services/bookSerices.js";
import { html } from "../utils.js";

let detailsTemplate = (book) => html`<section id="details-page" class="details">
	<div class="book-information">
		<h3>${book.title}</h3>
		<p class="type">Type: ${book.type}</p>
		<p class="img"><img src=${book.imageUrl} /></p>
		<div class="actions">
			<!-- Edit/Delete buttons ( Only for creator of this book )  -->
			${owenerTemplate(book)}
			<!-- Bonus -->
			<!-- Like button ( Only for logged-in users, which is not creators of the current book ) -->
			<!-- ( for Guests and Users )  -->
			${likesButtonTemplate(book)}
			<div class="likes">
				<img class="hearts" src="/images/heart.png" />
				<span id="total-likes">Likes: ${book.likes}</span>
			</div>
			<!-- Bonus -->
		</div>
	</div>
	<div class="book-description">
		<h3>Description:</h3>
		<p>${book.description}</p>
	</div>
</section>`;

let likesButtonTemplate = (book) => {
	if (book.isOwner === false && book.loggedIn === true && book.isLikedByUser === 0) {
		return html`<a @click=${book.likeHandler} class="button" href="javascript:void(0)">Like</a>`;
	} else {
		return null;
	}
};

let owenerTemplate = (book) => {
	if (book.isOwner) {
		return html`<a class="button" href="/edit/${book._id}">Edit</a>
	<a @click=${book.deleteHandler} class="button" href="#">Delete</a>`;
	} else {
		return null;
	}
};


export async function renderDetailsPage(context) {
	let id = context.params.id;
	let isLoggedIn = authServices.isLoggedIn();
	const [currentBook, likes, isLiked] = await Promise.all([
		bookSerices.getSingleBook(id),
		bookSerices.getLikes(id),
		isLoggedIn ? bookSerices.isLiked(id, sessionStorage.getItem('userId')) : null,
	]);

	let isOwner = currentBook._ownerId === sessionStorage.getItem("userId");
	currentBook.isOwner = isOwner;
	currentBook.likes = likes;
	currentBook.isLikedByUser = isLiked;
	if (sessionStorage.getItem("authToken") !== null && currentBook.isOwner === false) {
		currentBook.loggedIn = true;
	} else {
		currentBook.loggedIn = false;
	}
	currentBook.deleteHandler = onDelete;
	currentBook.likeHandler = onLike;
	
	context.renderView(detailsTemplate(currentBook));

	async function onLike() {
		await bookSerices.makeLike({ bookId: id });
		context.page.redirect('/details/' + id)
	}
	async function onDelete() {
		await bookSerices.deleteBook(id);
		context.page.redirect(`/`);
	}
	console.log(currentBook);
}
