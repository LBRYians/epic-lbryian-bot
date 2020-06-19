# epic-lbryian-bot
An epic discord bot!

### Setting up
Nodejs v12 and yarn are required.
```bash
yarn install
```

Create a file named `.env` in the repository's root folder, locally, where the bot is deployed or tested with the following contents(environment config variable):
```
token=[discord-token]
championships_list_location=[absolute-url]
```
Replace `[discord-token]` with your bot's discord token.

#### Championships List
This bot needs a local *JSON* file to store the list of championships. If you have one already, write the *absolute* url of the link in the `.env` file.
If you have not created one, create it with the `.json` extension and `{}` as the content initially.

###  Meme Championships
This bot can host meme championships with upvote system.
Each championship has its own metadata. This can be generated using the `src/championship/setUpChampionshipStructure.js` script.

#### Creating One
1. Use the included package.json script `createChampionship` which will walk you through the process. Type the following command in a terminal in the cloned repository.
```bash
yarn createChampionship
```

2. Restart the bot. This step changes from deployment to deployment.

#### Removing an Existing Championship
1. Use the included package.json script `removeChampionship` which will walk you through the process. Type the following command in a terminal in the cloned repository.
```bash
yarn removeChampionship
```

#### Editin an Existing Championship
You can change the total finalists, change emojis, or remove participation commands of an existing championship.
1. Use the included package.json script `editChampionship` which will walk you through the process. Type the following command in a terminal in the cloned repository.
```bash
yarn editChampionship
```

2. Restart the bot. This step changes from deployment to deployment.
