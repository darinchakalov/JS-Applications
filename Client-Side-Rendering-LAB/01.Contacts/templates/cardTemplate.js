import { html } from "../node_modules/lit-html/lit-html.js";
import onClick  from "../services/buttonHandler.js";

let cardTeplate = (contactInfo) => html` <div class="contact card">
	<div>
		<i class="far fa-user-circle gravatar"></i>
	</div>
	<div class="info">
		<h2>Name: ${contactInfo.name}</h2>
		<button @click=${onClick} class="detailsBtn">Details</button>
		<div class="details" id="1">
			<p>Phone number: ${contactInfo.phoneNumber}</p>
			<p>Email: ${contactInfo.email}</p>
		</div>
	</div>
</div>`;

export default cardTeplate;
