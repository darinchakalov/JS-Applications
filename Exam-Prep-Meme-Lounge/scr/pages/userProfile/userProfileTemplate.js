import { html } from "../../utils.js";

export let userProfileTemplate = (user) => html` <section id="user-profile-page" class="user-profile">
	<article class="user-info">
		<img
			id="user-avatar-url"
			alt="user-profile"
			src=${user.gender === "male" ? "/images/male.png" : "/images/female.png"}
		/>
		<div class="user-content">
			<p>Username: ${user.username}</p>
			<p>Email: ${user.email}</p>
			<p>My memes count: ${user.userMemes.length}</p>
		</div>
	</article>
	<h1 id="user-listings-title">User Memes</h1>
	<div class="user-meme-listings">
		<!-- Display : All created memes by this user (If any) -->
		${user.userMemes.length > 0 ? user.userMemes.map(memeTemplate) : noMemesTemplate()}

		<!-- Display : If user doesn't have own memes  -->
	</div>
</section>`;

let memeTemplate = (meme) => html` <div class="user-meme">
	<p class="user-meme-title">${meme.title}</p>
	<img class="userProfileImage" alt="meme-img" src=${meme.imageUrl} />
	<a class="button" href="/details/${meme._id}">Details</a>
</div>`;

let noMemesTemplate = () => html`<p class="no-memes">No memes in database.</p>`;
