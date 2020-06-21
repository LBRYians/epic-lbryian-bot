function getStats(client, championshipMeta, cb) {
  const { championshipGuild, colosseumChannel, upvoteEmoji, totalFinalists } = championshipMeta;
  let memes = [];

  const generateStats = (colosseum, posts, cb) => {
    posts.each(post => {
      let ups = 0;

      post.reactions.cache.array().forEach(reaction => {
        if (reaction.emoji.name == upvoteEmoji) ups += reaction.count;
      })

      memes.push({
        ups: ups - 1,
        caption: post.content.split('\n')[0],
        link: post.content.split('\n')[1]
      })
    })

    if (posts.size == 100) colosseum.messages.fetch({ limit: 100, before: posts.array().slice(-1)[0].id }).then(posts => generateStats(colosseum, posts, cb));
    else {
      memes = memes.sort((a, b) => b.ups - a.ups);

      let rank = 1;
      let skippedRanks = 0;
      let finalMemes = [
        {
          ...memes[0],
          rank
        }
      ]

      memes.slice(1).forEach((meme, i) => {
        if (rank <= totalFinalists) {
          if (finalMemes[i].ups > meme.ups) {
            rank += skippedRanks;
            skippedRanks = 0;
            finalMemes.push({
              ...meme,
              rank: ++rank
            })
          }
          else {
            finalMemes.push({
              ...meme,
              rank
            })
            skippedRanks++;
          }
        }
      })
      
      if (cb) cb(finalMemes);
    }
  }

  client.guilds.cache.get(championshipGuild).channels.cache.get(colosseumChannel).fetch().then(colosseum => {
    colosseum.messages.fetch({ limit: 100 }).then(posts => generateStats(colosseum, posts, cb));
  })
}

module.exports = getStats;