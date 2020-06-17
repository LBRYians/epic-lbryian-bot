function updateList(client, championshipMeta, cb = () => {}) {
  const { championshipGuild, announcementsChannel, championshipName, participantRole, listMsgId } = championshipMeta;

  client.guilds.cache.get(championshipGuild).channels.cache.get(announcementsChannel).messages.fetch().then(msgs => {
    const participants = client.guilds.cache.get(championshipGuild).roles.cache.get(participantRole).members.array();
    let list = `
**${championshipName.toUpperCase()} PARTICIPANTS (${participants.length}):**`;

    participants.forEach(participant => list += `\n- <@${participant.id}>`);

    const listMsg = msgs.get(listMsgId);
    listMsg.edit(list).then(cb);
  })
}

module.exports = updateList;