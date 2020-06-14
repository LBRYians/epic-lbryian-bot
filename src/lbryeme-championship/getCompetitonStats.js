const { championshipGuild, colosseumChannel, upvoteEmoji, downvoteEmoji, phase1Finalists } = require('./config.json');
let memes = [];

const generateStats = (colosseum, posts, cb) => {
  posts.each(post => {
    let ups = 0, downs = 0, total = 0;

    post.reactions.cache.array().forEach(reaction => {
      if (reaction.emoji.name == upvoteEmoji) ups += reaction.count;
      if (reaction.emoji.name == downvoteEmoji) downs += reaction.count;
    })

    total = ups - downs;

    memes.push({
      ups: ups,
      downs: downs,
      total: total,
      caption: post.content.split('\n')[0],
      link: post.content.split('\n')[1]
    })
  })

  if (posts.size == 100) colosseum.messages.fetch({ limit: 100, before: posts.array().slice(-1)[0].id }).then(posts => generateStats(colosseum, posts, cb))
  else {
    memes = memes.sort((a, b) => {
      if (a.total == b.total) return b.ups - a.ups;
      else return b.total - a.total;
    })

    let rank = 1;
    let finalMemes = [];

    memes.forEach((meme, i) => {
      finalMemes.push({
        ...meme,
        rank: rank
      })

      if ((i+1 < memes.length) && (meme.total == memes[i+1].total && meme.ups == memes[i+1].ups)) return;
      else return rank++;
    })

    finalMemes = finalMemes.filter(meme => meme.rank <= phase1Finalists);
    if (cb) cb(finalMemes);
  }
}

function getStats(client, cb) {
  memes = [];

  client.guilds.cache.get(championshipGuild).channels.cache.get(colosseumChannel).fetch().then(colosseum => {
    colosseum.messages.fetch({ limit: 100 }).then(posts => generateStats(colosseum, posts, cb))
  })
}

module.exports = getStats;