/* global describe beforeEach afterEach it */

import {expect} from 'chai'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
// REDUX
import reducer, {setAnimals, GET_ANIMALS} from '../animals'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('animals redux store', () => {
  let store
  let mockAxios

  const initialState = [];

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  const fakeAnimals = [
    {species: "Llama",
      imageUrl: "http://www.publicdomainpictures.net",
      price: 21895.11,
      description: "Craft beer activated charcoal",
    }
  ];

  describe('fetchAnimals thunk creator', () => {
    it('eventually dispatches the GET_ANIMALS action', async () => {
      mockAxios.onGet('/api/animals').replyOnce(200, fakeAnimals)
      await store.dispatch(setAnimals(fakeAnimals))
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GET_ANIMALS')
      expect(actions[0].animals).to.be.deep.equal(fakeAnimals)
    })
  })

  describe('`setAnimals` action creator', () => {
    const setAnimalsAction = setAnimals(fakeAnimals);

    it('returns a Plain Old JavaScript Object', () => {
      expect(typeof setAnimalsAction).to.equal('object');
      expect(Object.getPrototypeOf(setAnimalsAction)).to.equal(Object.prototype);
    });

    it('creates an object with `type` and `cartItems`', () => {
      expect(setAnimalsAction.type).to.equal(GET_ANIMALS);
      expect(Array.isArray(setAnimalsAction.animals)).to.be.true; // eslint-disable-line no-unused-expressions
      expect(setAnimalsAction.animals[0].species).to.equal('Llama');
    });

  });

  describe('animals reducer', () => {

    const newState = reducer(
      initialState,
      {
        type: GET_ANIMALS,
        animals: fakeAnimals
      }
    )

    it('returns a new state with the updated campuses', () => {
      expect(newState).to.deep.equal(fakeAnimals);
    });

  it('does not modify the previous state', () => {
      expect(initialState).to.deep.equal([]);
    });

  });
})


