import { html } from "../utils.js";

let homeTemplate = () => html`<section id="welcomePage">
<div id="welcome-message">
    <h1>Welcome to</h1>
    <h1>My Music Application!</h1>
</div>

<div class="music-img">
    <img src="./images/musicIcons.webp">
</div>
</section>`

export function renderHomePage(context) {
    context.renderView(homeTemplate())
}