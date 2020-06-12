const discord = require('discord.js');
require('dotenv').config();

const setVotes = require('./lbryeme-championship/votes');

const client = new discord.Client();

setVotes(client);

client.on('ready', () => console.log(`logged in as ${client.user.tag}`))
client.login(process.env.token);