const discord = require('discord.js');
const client = new discord.Client();
const fs = require('fs');
require('dotenv').config();

const updateMetaFile = meta => {
  fs.writeFileSync('generatedMeta.json', JSON.stringify(meta));
}

function setUpChampionshipStructure(championshipMeta) {
  const { championshipGuild, championshipName } = championshipMeta;
  console.log('Final metadata will be saved in ./generatedMeta.json');

  client.on('ready', () => {
    const guild = client.guilds.cache.get(championshipGuild);
    guild.channels.create(championshipName, {
      type: 'category'
    }).then(championshipCategory => {
      if (!championshipMeta.colosseumChannel) {
        console.log('No colosseum specified, creating one.');
        guild.channels.create(`${championshipName}-colosseum`, {
          type: 'text'
        })
        .then(colosseum => {
          console.log('Colosseum created, setting category');
          colosseum.setParent(championshipCategory);
          championshipMeta.colosseumChannel = colosseum.id;
          updateMetaFile(championshipMeta);
        })
      }

      if (!championshipMeta.announcementsChannel) {
        console.log('No channel specified for dumping bot announcement msgs. Creating one.');
        guild.channels.create(`${championshipName}-announcements`, {
          type: 'text'
        })
        .then(announcementsChannel => {
          console.log('announcements channel created. Setting stuff.');
          announcementsChannel.setParent(championshipCategory);
          championshipMeta.announcementsChannel = announcementsChannel.id;

          console.log('Sending a msg that will be updated to show participant list.');
          announcementsChannel.send(`PARTICIPANT LIST: THIS MESSAGE WILL BE AUTOMATICALLY UPDATED.`).then(msg => {
            console.log('Sent participant list.');
            championshipMeta.listMsgId = msg.id;
            updateMetaFile(championshipMeta);
          })
        })
      }
      else if (!championshipMeta.listMsgId) {
        const announcementsChannel = guild.channels.cache.get(championshipMeta.announcementsChannel);
        console.log('Sending a msg that will be updated to show participant list.');
        announcementsChannel.send(`PARTICIPANT LIST: THIS MESSAGE WILL BE AUTOMATICALLY UPDATED.`).then(msg => {
          console.log('Sent participant list.');
          championshipMeta.listMsgId = msg.id;
          updateMetaFile(championshipMeta);
        })
      }

      if (!championshipMeta.participantRole) {
        console.log('No participant role specified, making one.');
        guild.roles.create({
          data: {
            name: `${championshipName}-memer`,
            mentionable: true,
            hoist: true
          }
        })
        .then(role => {
          console.log('Participant role created.');
          championshipMeta.participantRole = role.id;
          updateMetaFile(championshipMeta);
        })
      }

      if (!championshipMeta.voterRole) {
        console.log('No voter role specified, making one.');
        guild.roles.create({
          data: {
            name: `${championshipName}-voter`,
            mentionable: true
          }
        })
        .then(role => {
          console.log('Voter role created.');
          championshipMeta.participantRole = role.id;
          updateMetaFile(championshipMeta);
        })
      }
    })
  
    if (!championshipMeta.upvoteEmoji) {
      console.log('No upvote emoji specified, defaulting to 👍');
      championshipMeta.upvoteEmoji = '👍';
    }

    if (!championshipMeta.downvoteEmoji) {
      console.log('No downvote emoji specified, defaulting to 👎');
      championshipMeta.downvoteEmoji = '👎';
    }

    if (!championshipMeta.totalFinalists) {
      console.log('Total finalists not specified, defaulting to 3');
      championshipMeta.totalFinalists = 10;
    }

    updateMetaFile(championshipMeta);
  })

  client.login(process.env.token);
}

module.exports = setUpChampionshipStructure;