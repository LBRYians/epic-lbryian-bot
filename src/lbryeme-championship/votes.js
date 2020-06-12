const { prefix } = require('../config.json');

function setVotes(client) {
  client.on('message', msg => {
    if (msg.content.trim().toLowerCase() == `${prefix}champ`) {
      msg.channel.send('Generating competition stats. This can (and will) take time.');
    }
  })
}

module.exports = setVotes;