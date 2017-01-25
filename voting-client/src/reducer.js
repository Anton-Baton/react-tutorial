import {List, Map} from 'immutable';

function setState(state, newState){
  return state.merge(newState);
}

function vote(state, entry){
  const currentPair = state.getIn(['vote', 'pair']);
  if (currentPair && currentPair.includes(entry)){
    return state.set('hasVoted', Map({
      voteValue: entry,
      voteRound: state.get('round')
    }));
  } else {
    return state;
  }
}

function resetVote(state) {
  const voteRound = state.getIn(['hasVoted', 'voteRound']);
  const currentPair = state.getIn(['vote', 'pair'], List());
  const currentRound = state.get('round')
  if (voteRound && voteRound !== currentRound) {
    return state.setIn(['hasVoted', 'voteValue'], null);
  } else {
    return state;
  }
}

export default function(state=Map(), action){
  switch(action.type){
    case 'SET_STATE':
      return resetVote(setState(state, action.state));
    case 'VOTE':
      return vote(state, action.entry);
  }
  return state;
}
