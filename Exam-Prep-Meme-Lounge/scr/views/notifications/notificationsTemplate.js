import { html } from "../../utils.js";

export let notificationsTemplate = (errorMessage) => html`
<div id="errorBox" class="notification">
	<span>${errorMessage}</span>
</div>`;
