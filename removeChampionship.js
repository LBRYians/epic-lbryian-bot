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

const removeChampionship = question('Which one is over?: ');

if (Object.keys(currentList).includes(removeChampionship)) {
  console.log(`Removing ${removeChampionship}`);
  delete currentList[removeChampionship];
  fs.writeFileSync(process.env.championships_list_loc, JSON.stringify(currentList));
}
else console.log('Invalid championship!');