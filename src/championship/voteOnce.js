const discord = require('discord.js');
require('dotenv').config();

function voteOnce(championshipGuild, colosseumChannel, upvoteEmoji) {
  const client = new discord.Client();

  const vote = (colosseum, messages) => {
    messages.each(msg => {
      msg.react(upvoteEmoji);
    })

    // if more messages might be available, fetch those too (limit of 100)
    if (messages.size == 100) colosseum.messages.fetch({ limit: 100, before: messages.array().slice(-1)[0].id }).then(messages => vote(colosseum, messages));
    else {
      console.log('reacted to all messages')
    }
  }

  client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}! Setting Votes!`);
  
    client.guilds.cache.get(championshipGuild).channels.cache.get(colosseumChannel).fetch().then(colosseum => {
      colosseum.messages.fetch({ limit: 100 }).then(messages => vote(colosseum, messages)); // set a single starting vote on all messages (limit 100)
    })
  
  })

  client.login(process.env.token);
}

module.exports = voteOnce;
