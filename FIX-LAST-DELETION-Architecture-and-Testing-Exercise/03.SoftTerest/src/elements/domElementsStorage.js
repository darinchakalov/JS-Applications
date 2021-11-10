import { e } from "../elements/dom.js";
import { deleteIdea, getIdea } from "../services/ideasServices.js";

export function ideaPreview(idea) {
	let cardDiv = e("div", undefined, "card overflow-hidden current-card details");
	cardDiv.style.width = "20rem";
	cardDiv.style.height = "18rem";

	let cardBody = e("div", cardDiv, "card-body");
	let cardTitle = e("p", cardBody, "card-text", idea.title);

	let cardImage = e("img", cardDiv, "card-image");
	cardImage.src = idea.img;
	cardImage.alt = "Card image cap";

	let detailsBtn = e("button", cardDiv, "btn", "Details");
	detailsBtn.dataset.id = idea._id;

	return cardDiv;
}

export async function ideaDetails(id) {
	const ideaData = await getIdea(id);
	let ideaDetailsDiv = e("div", undefined, "container home some");

	let image = e("img", ideaDetailsDiv, "det-img");
	image.src = ideaData.img;

	let descriptionDiv = e("div", ideaDetailsDiv, "desc");
	let title = e("h2", descriptionDiv, "display-5", ideaData.title);
	let descP = e("p", descriptionDiv, "infoType", "Description:");
	let description = e("p", descriptionDiv, "idea-description", ideaData.description);

	if (ideaData._ownerId === sessionStorage.getItem("userID")) {
		let btnDiv = e("div", ideaDetailsDiv, "text-center");
		let deleteBtn = e("button", btnDiv, "btn detb", "Delete");
		deleteBtn.dataset.id = id
	}

	return ideaDetailsDiv;
}

{
	/* <div id="details" class="container home some">
				<img class="det-img" src="./images/dinner.jpg" />
				<div class="desc">
					<h2 class="display-5">Dinner Recipe</h2>
					<p class="infoType">Description:</p>
					<p class="idea-description">
						There are few things as comforting as heaping bowl of pasta at the end of a long day. With so
						many easy pasta recipes out there, there's something for every palate to love. That's why pasta
						makes such a quick, easy dinner for your family—it's likely to satisfy everyone's cravings, due
						to its versatility.
					</p>
				</div>
				<div class="text-center">
					<a class="btn detb" href="">Delete</a>
				</div>
			</div> */
}
