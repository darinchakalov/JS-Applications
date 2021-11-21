import { get } from "../helpers/dataGenerator.js";

async function getAllTeams() {
	let result = await get("/data/teams");
	return result;
}

async function getAllMembers(){
	let result = await get('/data/members?where=status%3D%22member%22')
	return result;
}

function teamsWithMembers(teams, allMembers) {
	for (const team of teams) {
		team.members = []
		for (const member of allMembers) {
			if (member.teamId === team._id) {
				team.members.push(member)
			}
		}
	}
	return teams;
}

export default { 
    getAllTeams,
	getAllMembers,
	teamsWithMembers
}