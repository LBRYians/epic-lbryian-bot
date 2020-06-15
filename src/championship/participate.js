const { prefix } = require('../config.json');

function setParticipation(client, participantRole, competitionName) {
  client.on('message', msg => {
    if (msg.content.trim().toLowerCase() == `${prefix}participate ${competitionName}`) {
      const role = msg.guild.roles.cache.get(participantRole);

      if (msg.member.roles.cache.get(participantRole)) msg.channel.send(`<@${msg.author.id}> You are already participating :)`);
      else {
        msg.member.roles.add(role).then(() => {
          msg.channel.send(`<@${msg.author.id}> You've been added!`);
        })
        .catch(() => msg.channel.send('Whoops! Something went wrong. Please try again. If this problem persists, please mention a dev.'))
      }
    }
    else if (msg.content.trim().toLowerCase() == `${prefix}quit ${competitionName}`) {
      const role = msg.guild.roles.cache.get(participantRole);

      if (msg.member.roles.cache.get(participantRole)) {
        msg.member.roles.remove(role).then(() => {
          msg.channel.send(`<@${msg.author.id}> You've been removed from the list :(`)
        })
        .catch(() => msg.channel.send('Whoops! Something went wrong. Please try again. If this problem persists, please mention a dev.'))
      }
      else {
        msg.channel.send(`<@${msg.author.id}> You are not a participant. ¯\\_(ツ)_/¯`);
      }
    }
  })
}

module.exports = setParticipation;