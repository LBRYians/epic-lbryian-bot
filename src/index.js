const discord = require('discord.js');
require('dotenv').config();

const setPhase1 = require('./lbryeme-championship/setPhase1');

const client = new discord.Client();

setPhase1(client);

client.on('ready', () => console.log(`logged in as ${client.user.tag}`))
client.login(process.env.token);