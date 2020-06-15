function getVoterList(client, championshipMeta, cb) {
  const { championshipGuild, colosseumChannel, voterRole } = championshipMeta;
  let voterIds = [];

  const getUsers = (reaction, users, cb) => {
    users.array().forEach(user => {
      if (!user.bot && !voterIds.includes(user.id)) voterIds.push(user.id);
    })

    if (users.size == 100) reaction.users.fetch({ limit: 100, before: users.array().slice(-1)[0].id }).then(users => getUsers(reaction, users, cb));
    else cb();
  }

  const fetchVoterList = (colosseum, posts) => {
    posts.array().forEach((post, i) => {
      post.reactions.cache.array().forEach((reaction, j) => {
        reaction.users.fetch({ limit: 100 }).then(users => getUsers(reaction, users, () => {
          if ((i == posts.size - 1) && (j == post.reactions.cache.size - 1)) {
            if (posts.size == 100) colosseum.messages.fetch({ limit: 100, before: posts.array().slice(-1)[0].id }).then(posts => fetchVoterList(colosseum, posts));
            else {
              voterIds.forEach(voter => {
                const role = colosseum.guild.roles.cache.get(voterRole);
                colosseum.guild.members.cache.get(voter).roles.add(role);
              })

              if (cb) cb(voterIds);
            }
          }
        })
        )
      })
    })
  }

  client.guilds.cache.get(championshipGuild).channels.cache.get(colosseumChannel).fetch().then(colosseum => {
    colosseum.messages.fetch({ limit: 100 }).then(posts => fetchVoterList(colosseum, posts));
  })
}

module.exports = getVoterList;