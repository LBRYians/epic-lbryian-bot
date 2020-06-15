const { phase1Meta } = require('./config.json');

const setParticipation = require('../championship/participate');
const setVotes = require('../championship/votes');

function setPhase1(client) {
  setParticipation(client, phase1Meta);
  setVotes(client, phase1Meta);
}

module.exports = setPhase1;