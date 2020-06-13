const discord = require('discord.js');
require('dotenv').config();

const { rulesChannel, championshipGuild, phase1ParticipantList, phase1Role } = require('./config.json');

function updatePhase1List(client) {
  client.guilds.cache.get(championshipGuild).channels.cache.get(rulesChannel).messages.fetch().then(msgs => {
    const participants = client.guilds.cache.get(championshipGuild).roles.cache.get(phase1Role).members.array()
    let list = `
**CHAMPIONSHIP PHASE 1 PARTICIPANTS**
-------------------------------------`;

    participants.forEach(participant => list += `\n- <@${participant.id}>`);

    const phase1ListMsg = msgs.get(phase1ParticipantList);
    phase1ListMsg.edit(list)
  })
}

function setParticipation(client) {
  client.on('message', msg => {
    if (msg.content.trim().toLowerCase() == '!participate') {
      const role = msg.guild.roles.cache.get(phase1Role);

      if (msg.member.roles.cache.get(phase1Role)) msg.channel.send(`<@${msg.author.id}> You are already participating :)`);
      else {
        msg.member.roles.add(role);
        msg.channel.send(`<@${msg.author.id}> You've been added!`)

        updatePhase1List(client);
      }
    }
    else if (msg.content.trim().toLowerCase() == '!quit') {
      const role = msg.guild.roles.cache.get(phase1Role);

      if (msg.member.roles.cache.get(phase1Role)) {
        msg.member.roles.remove(role);
        msg.channel.send(`<@${msg.author.id}> You've been removed from the list :(`)

        updatePhase1List(client);
      }
      else {
        msg.channel.send(`<@${msg.author.id}> You are not a participant. ¯\\_(ツ)_/¯`);
      }
    }
  })
}

module.exports = setParticipation;