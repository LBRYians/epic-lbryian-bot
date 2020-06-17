const discord = require('discord.js');
require('dotenv').config();

const setPhase1 = require('./lbryeme-championship/setPhase1');
//const setChampionship = require('./example-championship/setExampleChampionship');

const client = new discord.Client();

setPhase1(client);
//setChampionship(client);

const tryLogin = () => {
	console.log('login failed. Trying again.');

	setTimeout(() => client.login(process.env.token).catch(tryLogin), 1000)
}

client.login(process.env.token).catch(tryLogin);