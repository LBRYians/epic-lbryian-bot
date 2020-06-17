# epic-lbryian-bot
An epic discord bot!

### Setting up
Nodejs v12 and yarn are required.
```bash
yarn install
```

###  Meme Championships
This bot can host meme championships with upvote/downvote system.
Each championship has its own metadata. This can be generated using the `src/championship/setUpChampionshipStructure.js` script.

#### Setting one up
1. Open a node shell/REPL
```bash
node
```

2. Import the script (the path may be different for you if you are in another directory, update accordingly)
```js
const setUp = require('./src/championship/setUpChampionshipStructure');
```

3. Create basic meta object: The basic meta can have any number of properties, even all of them. See the example meta in `src/example-championship/champ-meta.json`. Minimum `championshipGuild`(id of the guild AKA server) and `championshipName`(name as a string for the championship are required).
```js
const meta = {
  championshipGuild: '[put-guild-id-here]',
  championshipName: 'Name'
  //upvoteEmoji
  //any other property even custom ones
}
```

4. Give the script the basic meta and it will create everything and put the final meta in `./generatedMeta.json`.
5. Use the meta and set up the championship: See the structure of `src/example-championship`. This generated meta file will be the source for the meta.
5. Import the setup script inside `src/index.js` and run the function (example code for the same has been put inside index.js and commented).

NOTE: Created channels and roles have default perms and generated names, you can edit anything as long as the bot has permissions to use the channels and roles.