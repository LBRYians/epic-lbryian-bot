const discord = require('discord.js');
require('dotenv').config();
const { championshipGuild, colosseumChannel } = require('./config.json');

const client = new discord.Client();

const vote = (colosseum, messages) => {
  messages.each(msg => {
    msg.react('😍');
    msg.react('🤮');
  })

  if (messages.size == 100) colosseum.messages.fetch({ limit: 100, before: messages.array().slice(-1)[0].id }).then(messages => vote(colosseum, messages));
  else {
    console.log('reacted to all messages')
  }
}

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}! Setting Votes!`);

  client.guilds.cache.get(championshipGuild).channels.cache.get(colosseumChannel).fetch().then(colosseum => {
    colosseum.messages.fetch({ limit: 100 }).then(messages => vote(colosseum, messages));
  })

})

client.login(process.env.token);