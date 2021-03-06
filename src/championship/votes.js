const { prefix } = require('../config.json');
const getStats = require('./getChampionshipStats');
const getVoterList = require('./getVoterList');

function setVotes(client, championshipMeta) {
  const { colosseumChannel, upvoteEmoji, championshipName } = championshipMeta;

  client.on('message', msg => {
    if (msg.content.trim().toLowerCase() == `${prefix}champ ${championshipName}`) {
      // Championship Current Stats
      msg.channel.send('Generating championship stats. This can (and will) take time.');
      getStats(client, championshipMeta, finalMemes => {
        finalMemes.forEach(meme => {
          msg.channel.send(`\
**#${meme.rank}** Meme in **${championshipName.toUpperCase()}**    
**Caption**: ${meme.caption}
**Link**: ${meme.link}
\`${meme.ups}\` ${upvoteEmoji}`)
        })
      })
    }
    else if (msg.channel.id === colosseumChannel) {
      // Set votes on a new post
      msg.react(upvoteEmoji);
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