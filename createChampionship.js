const { question } = require('readline-sync');
const setUpChampionshipStructure = require('./src/championship/setUpChampionshipStructure');

const championshipName = question('Enter the championshipName (required): ');
const championshipGuild = question('Enter the id of the discord server (required): ');

const totalFinalists = Math.round(Number(question('Enter the number of finalists (enter for default 3): ')));
const upvoteEmoji = question('Enter the upvote emoji (emoji itself like 👍 not :thumbsup:) (Enter for default 👍): ');
const downvoteEmoji = question('Enter the upvote emoji (emoji itself like 👎 not :thumbsdown:) (Enter for default 👎): ');

let allowParticipationCommands = question('Enable/Disable !participate and !quit (Answer true or false, default false): ');
allowParticipationCommands = allowParticipationCommands.trim().toLowerCase() == 'true';

setUpChampionshipStructure({ championshipGuild, championshipName, upvoteEmoji, downvoteEmoji, totalFinalists, allowParticipationCommands });
