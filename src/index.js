const discord = require('discord.js');
require('dotenv').config();

const setVotes = require('./lbryeme-championship/votes');
const setVoterList = require('./lbryeme-championship/voterList');
const { setParticipation } = require('./lbryeme-championship/participate');

const client = new discord.Client();

setVotes(client);
setVoterList(client);
setParticipation(client);

client.on('ready', () => console.log(`logged in as ${client.user.tag}`))
client.login(process.env.token);