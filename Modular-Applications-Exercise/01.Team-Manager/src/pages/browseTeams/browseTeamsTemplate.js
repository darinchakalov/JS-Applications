import { html } from "../../../node_modules/lit-html/lit-html.js";

let singleTeamTemplate = (team) => html`
	<article class="layout">
		<img src=${team.logoUrl} class="team-logo left-col" />
		<div class="tm-preview">
			<h2>${team.name}</h2>
			<p>${team.description}</p>
			<span class="details">${team.members.length} Members</span>
			<div><a href=/details/${team._id} class="action">See details</a></div>
		</div>
	</article>
`;

export let browseTeamsTemplate = (teams, isLoggedIn) => html`
	<article class="pad-med">
		<h1>Team Browser</h1>
	</article>
	${isLoggedIn ? usersTemplate() : ''}
	${teams.map(singleTeamTemplate)}
`;

let usersTemplate = () => html` <article class="layout narrow">
	<div class="pad-small"><a href="#" class="action cta">Create Team</a></div>
</article>`;
