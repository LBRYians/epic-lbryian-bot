const discord = require('discord.js');
require('dotenv').config();
const setParticipation = require('./championship/participate');
const setVotes = require('./championship/votes');
const updateList = require('./championship/updateList');

const championshipsList = require(process.env.championships_list_loc);
const client = new discord.Client();

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}`);
	
	for (let championship in championshipsList) {
		console.log(`Setting up ${championship}`, championshipsList[championship]);
		
		setVotes(client, championshipsList[championship]);
		if (championshipsList[championship].allowParticipationCommands) setParticipation(client, championshipsList[championship]);
		updateList(client, championshipsList[championship]);
	}
})

const tryLogin = () => {
	console.log('login failed. Trying again.');

	setTimeout(() => client.login(process.env.token).catch(tryLogin), 1000);
}

client.login(process.env.token).catch(tryLogin);