const fs = require('fs');
require('dotenv').config();
const { question } = require('readline-sync');

const currentList = JSON.parse(fs.readFileSync(process.env.championships_list_loc));

if (Object.keys(currentList).length < 1) {
  console.log('No championships found.');
  process.exit();
}

console.log('Curent Championships:');
Object.keys(currentList).forEach(champName => console.log(champName));

const editChampionship = question('Which one do you want to change?: ');

if (Object.keys(currentList).includes(editChampionship)) {
  const championship = currentList[editChampionship];

  const totalFinalists = question(`What should be the new total finalists (Current: ${championship.totalFinalists}, Enter for default): `);
  const upvoteEmoji = question(`What should be the new upvote emoji? (Current: ${championship.upvoteEmoji}, Enter for default): `);
  const allowParticipationCommands = question(`Show !participate and !quit be allowed? (Answer true or false) (Current ${championship.allowParticipationCommands}, Enter for default): `)
  
  if (totalFinalists.trim()) championship.totalFinalists = totalFinalists;
  if (upvoteEmoji.trim()) championship.upvoteEmoji = upvoteEmoji;
  if (allowParticipationCommands) championship.allowParticipationCommands = allowParticipationCommands.trim().toLowerCase() == 'true';
  
  fs.writeFileSync(process.env.championships_list_loc, JSON.stringify(currentList));
}
else console.log('Invalid championship!');