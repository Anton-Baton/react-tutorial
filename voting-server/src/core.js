import {List, Map} from 'immutable';

export const INITIAL_STATE = Map({round: 0});

export function setEntries(state, entries) {
  return state.set('entries', List(entries));
}

function getWinners(vote) {
  if (!vote) return [];

  const [a, b] = vote.get('pair').toArray();
  const aVotes = vote.getIn(['tally', a], 0);
  const bVotes = vote.getIn(['tally', b], 0);
  if (aVotes > bVotes) return [a];
  else if (aVotes < bVotes) return [b];
  return [a, b];
}

function getNewRound(state){
    const currentRound = state.get('round') || 0;
    return currentRound + 1;
}

export function next(state) {
  const entries = state.get('entries').concat(getWinners(state.get('vote')));
  if (entries.size === 1){
    return state.remove('vote')
                .remove('entries')
                .set('winner', entries.first());
  }
  return state.merge({
    vote: Map({pair: entries.take(2)}),
    entries: entries.skip(2),
    round: getNewRound(state)
  });
}

export function vote(voteState, entry) {
  const currentPair = voteState.get('pair');
  if (currentPair && currentPair.includes(entry)){
    return voteState.updateIn(
      ['tally', entry],
      0,
      tally => tally + 1
    )
  }
  return voteState;

}

export function addClient(clients, client){
  if (!(clients.includes(client))){
    return clients.push(client);
  }
  return clients;
}

export function removeClient(clients, client){
  return clients.filter(item => item !== client);
}
