const { Client } = require('discord.js');
require('dotenv').config();

const client = new Client();
const { updatePhase1List } = require('./participate');

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}. Updating participant list.`);

  updatePhase1List(client, () => {process.exit()});
})

client.login(process.env.token);