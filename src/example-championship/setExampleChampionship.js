const meta = require('./champ-meta.json');

const setParticipation = require('../championship/participate');
const setVotes = require('../championship/votes');

function setChampionship(client) {
  setParticipation(client, meta); // Sets !participate, !quit and participant list. Use only if needed
  setVotes(client, meta); // Sets !champ, !voterlist and the whole voting system. Use only if needed
}

module.exports = setChampionship;