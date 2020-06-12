const { prefix } = require('../config.json');
const { colosseumChannel } = require('./config.json');
const getStats = require('./getCompetitonStats');
const { MessageEmbed } = require('discord.js')

function setVotes(client) {
  client.on('message', msg => {
    if (msg.content.trim().toLowerCase() == `${prefix}champ`) {
      // Championship Current Stats
      msg.channel.send('Generating competition stats. This can (and will) take time.');
      getStats(client, hottestMemes => {
        hottestMemes.forEach(meme => {
          msg.channel.send(
            new MessageEmbed()
              .setTimestamp()
              .setTitle('Hottest LBRYEME')
              .addField('**Caption**', meme.meme.split('\n')[0].split(':')[1])
              .addField('Total :star2:', `\`${meme.total}\``, true)
              .addField('Upvotes :+1:', `\`${meme.ups}\``, true)
              .addField('Downvotes :-1:', `\`${meme.downs}\``, true)
          )

          msg.channel.send(meme.meme.split('\n')[1]);
        })
      })
    }
    else if (msg.channel.id === colosseumChannel) {
      // Set votes on a new post
      msg.react('😍');
      msg.react('🤮');
    }
  })
}

module.exports = setVotes;