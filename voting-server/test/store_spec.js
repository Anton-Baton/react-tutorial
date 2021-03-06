import {Map, fromJS} from 'immutable';
import {expect} from 'chai';

import makeStore from '../src/store'

describe('store', () => {
  it('is Redux store configured with correct reducer', () => {
    const store = makeStore();
    expect(store.getState()).to.equal(Map({round: 0}));

    store.dispatch({
      type: 'SET_ENTRIES',
      entries: ['Trainspotting', '28 Days Later']
    });

    expect(store.getState()).to.equal(fromJS({
      round: 0,
      entries: ['Trainspotting', '28 Days Later']
    }));
  });


});
