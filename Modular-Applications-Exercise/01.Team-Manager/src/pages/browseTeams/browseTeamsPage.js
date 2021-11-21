import authServices from "../../services/authServices.js";
import teamsServices from "../../services/teamsServices.js";
import { browseTeamsTemplate } from "./browseTeamsTemplate.js";



async function showView(context) {
	let teams = await teamsServices.getAllTeams();
	let allMembers = await teamsServices.getAllMembers();

	let teamsWithMembersCount = teamsServices.teamsWithMembers(teams, allMembers)

	let isLoggedIn = authServices.isLoggedIn();
	let resultTemplate = browseTeamsTemplate(teamsWithMembersCount, isLoggedIn);
	context.renderView(resultTemplate);
}

export default {
	showView,
};
