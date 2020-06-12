const { championshipGuild, colosseumChannel, upvoteEmoji, downvoteEmoji } = require('./config.json');
let hottestMemes = [
  {
    ups: 0,
    downs: 0,
    total: 0,
    meme: ''
  }
]

const generateStats = (colosseum, posts, cb) => {
  posts.each(post => {
    let ups = 0, downs = 0, total = 0;

    post.reactions.cache.array().forEach(reaction => {
      if (reaction.emoji.name == upvoteEmoji) ups += reaction.count;
      if (reaction.emoji.name == downvoteEmoji) downs += reaction.count;
    })

    total = ups - downs;

    if (hottestMemes[0].total < total || hottestMemes[0].meme == '') hottestMemes = [{
      ups,
      downs,
      total,
      meme: post.content
    }]
    else if (hottestMemes[0].total == total) hottestMemes.push({
      ups,
      downs,
      total,
      meme: post.content
    })
  })

  if (posts.size == 100) colosseum.messages.fetch({ limit: 100, before: posts.array().slice(-1)[0].id }).then(posts => generateStats(colosseum, posts, cb))
  else {
    if (cb) cb(hottestMemes);
  }
}

function getStats(client, cb) {
  hottestMemes = [
    {
      ups: 0,
      downs: 0,
      total: 0,
      meme: ''
    }
  ]

  client.guilds.cache.get(championshipGuild).channels.cache.get(colosseumChannel).fetch().then(colosseum => {
    colosseum.messages.fetch({ limit: 100 }).then(posts => generateStats(colosseum, posts, cb))
  })
}

module.exports = getStats;