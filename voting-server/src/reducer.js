import {
  setEntries,
  next,
  vote,
  removeClient,
  addClient,
  INITIAL_STATE
} from './core'

export default function reducer(state = INITIAL_STATE, action){
  console.log(action);
  switch (action.type) {
    case 'SET_ENTRIES':
      return setEntries(state, action.entries);
    case 'NEXT':
      return next(state);
    case 'VOTE':
      return state.update('vote', voteState => vote(voteState, action.entry));
    case 'ADD_CLIENT':
      return state.update('clients', clients => addClient(clients, action.client));
    case 'REMOVE_CLIENT':
      return state.update('clients', clients => removeClient(clients, action.client));
  }
  return state;

}
