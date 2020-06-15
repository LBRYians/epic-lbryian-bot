const { prefix } = require('../config.json');
const { MessageEmbed } = require('discord.js');
const getStats = require('./getChampionshipStats');
const getVoterList = require('./getVoterList');

function setVotes(client, championshipMeta) {
  const { colosseumChannel, upvoteEmoji, downvoteEmoji, championshipName } = championshipMeta;

  client.on('message', msg => {
    if (msg.content.trim().toLowerCase() == `${prefix}champ ${championshipName}`) {
      // Championship Current Stats
      msg.channel.send('Generating championship stats. This can (and will) take time.');
      getStats(client, championshipMeta, finalMemes => {
        finalMemes.forEach(meme => {
          msg.channel.send(
            new MessageEmbed()
              .setTimestamp()
              .setTitle(` #${meme.rank} Meme in ${championshipName}`)
              .addField('**Caption**', meme.caption)
              .addField('Total :star2:', `\`${meme.total}\``, true)
              .addField('Upvotes :+1:', `\`${meme.ups}\``, true)
              .addField('Downvotes :-1:', `\`${meme.downs}\``, true)
              .setImage(meme.link)
              .setFooter('Stats Generated by EPIC LBRYian Bot')
          )
        })
      })
    }
    else if (msg.channel.id === colosseumChannel) {
      // Set votes on a new post
      msg.react(upvoteEmoji);
      msg.react(downvoteEmoji);
    }
    else if (msg.content.trim().toLowerCase() == `${prefix}voterlist ${championshipName}`) {
      getVoterList(client, championshipMeta, voterIds => {
        let voterList = `\n**${championshipName.toUpperCase()}** VOTERS:\n`;

        voterIds.forEach(id => voterList += `- <@${id}> \n`);
        msg.channel.send(voterList);
      })
    }
  })
}

module.exports = setVotes;