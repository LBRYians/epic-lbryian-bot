const { prefix } = require('../config.json');
const { championshipGuild, colosseumChannel, voterRole } = require('./config.json');

let voterIds = [];

const getUsers = (reaction, users, cb) => {
  users.array().forEach(user => {
    if (!user.bot && !voterIds.includes(user.id)) voterIds.push(user.id);
  })

  if (users.size == 100) reaction.users.fetch({ limit: 100, before: users.array().slice(-1)[0].id }).then(users => getUsers(reaction, users, cb));
  else cb();
}

const getVoterList = (colosseum, posts, channel) => {
  posts.array().forEach((post, i) => {
    post.reactions.cache.array().forEach((reaction, j) => {
      reaction.users.fetch({ limit: 100 }).then(users => getUsers(reaction, users, () => {
        if ((i == posts.size - 1) && (j == post.reactions.cache.size - 1)) {
          if (posts.size == 100) colosseum.messages.fetch({ limit: 100, before: posts.array().slice(-1)[0].id }).then(posts => getVoterList(colosseum, posts, channel));
          else {
            let finalMsg = `VOTERS! (${voterIds.length})`;

            voterIds.forEach(voter => {
              finalMsg += `\n- <@${voter}>`;

              const role = channel.guild.roles.cache.get(voterRole);
              channel.guild.members.cache.get(voter).roles.add(role);
            })

            channel.send(finalMsg);
          }
        }
      }))
    })
  })
}

function setVoterList(client) {
  client.on('message', msg => {
    if (msg.content.trim().toLowerCase() == `${prefix}voterlist`) {
      voterIds = [];
      client.guilds.cache.get(championshipGuild).channels.cache.get(colosseumChannel).fetch().then(colosseum => {
        colosseum.messages.fetch({ limit: 100 }).then(posts => getVoterList(colosseum, posts, msg.channel));
      })
    }
  })
}

module.exports = setVoterList;