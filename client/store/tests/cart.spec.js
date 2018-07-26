/* global describe beforeEach afterEach it */

import {expect} from 'chai'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
// REDUX
import reducer, {setCartItems, SET_CART_ITEMS} from '../cart'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('cart redux store', () => {
  let store
  let mockAxios

  const initialState = {
      list: [],
      count: 0,
  };

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  const fakeCart = [
    {user: 'Andrew', animal:'bunny', quantity: 8},
    {user: 'Matt', animal:'llama', quantity: 81},
    {user: 'Gini', animal:'alpaca', quantity: 27},
  ];

  describe('fetchCart thunk creator', () => {
    it('eventually dispatches the SET_CART_ITEMS action', async () => {
      mockAxios.onGet('/api/cart').replyOnce(200, fakeCart)
      await store.dispatch(setCartItems(fakeCart))
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('SET_CART_ITEMS')
      expect(actions[0].cartItems).to.be.deep.equal(fakeCart)
    })
  })

  describe('`setCartItems` action creator', () => {
    const setCartAction = setCartItems(fakeCart);

    it('returns a Plain Old JavaScript Object', () => {
      expect(typeof setCartAction).to.equal('object');
      expect(Object.getPrototypeOf(setCartAction)).to.equal(Object.prototype);
    });

    it('creates an object with `type` and `cartItems`', () => {
      expect(setCartAction.type).to.equal(SET_CART_ITEMS);
      expect(Array.isArray(setCartAction.cartItems)).to.be.true; // eslint-disable-line no-unused-expressions
      expect(setCartAction.cartItems[0].user).to.equal('Andrew');
    });

  });

  describe('cart reducer', () => {

    const newState = reducer(
      initialState,
      {
        type: SET_CART_ITEMS,
        cartItems: fakeCart
      }
    )

    it('returns a new state with the updated campuses', () => {
      expect(newState.list).to.deep.equal(fakeCart);
    });

  it('does not modify the previous state', () => {
      expect(initialState).to.deep.equal({
        list: [],
        count: 0,
      });
    });

  });
})


