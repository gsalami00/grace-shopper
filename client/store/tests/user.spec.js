/* global describe beforeEach afterEach it */

import {expect} from 'chai'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import history from '../../history'
// REDUX
import reducer, {getUser, GET_USER, me, logout} from '../user'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('user redux store', () => {
  let store
  let mockAxios

  const initialState = {currentUser: {}}
  const fakeUser = {
    firstName: 'Piggly',
    lastName: 'Wiggles',
    email: 'pw@gmail.com',
  }

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })



  describe('me thunk creator', () => {
    it('eventually dispatches the GET USER action', async () => {
      mockAxios.onGet('/auth/me').replyOnce(200, fakeUser)
      await store.dispatch(me())
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GET_USER')
      expect(actions[0].user).to.be.deep.equal(fakeUser)
    })
  });

  describe('logout thunk creator', () => {
    it('logout: eventually dispatches the REMOVE_USER action', async () => {
      mockAxios.onPost('/auth/logout').replyOnce(204)
      await store.dispatch(logout())
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('REMOVE_USER')
      expect(history.location.pathname).to.be.equal('/')
    })
  });

  describe('`getUser` action creator', () => {
    const getUserAction = getUser(fakeUser);

    it('returns a Plain Old JavaScript Object', () => {
      expect(typeof getUserAction).to.equal('object');
      expect(Object.getPrototypeOf(getUserAction)).to.equal(Object.prototype);
    });

    it('creates an object with `type` and `user`', () => {
      expect(getUserAction.type).to.equal(GET_USER);
      expect(Object.getPrototypeOf(getUserAction.user)).to.equal(Object.prototype);
      expect(getUserAction.user.firstName).to.equal('Piggly');
    });

  });

  describe('reducer', () => {

    const newState = reducer(
      initialState,
      {
        type: GET_USER,
        user: fakeUser
      }
    )

    it('returns a new state with the updated campuses', () => {
      expect(newState.currentUser).to.deep.equal(fakeUser);
    });

  it('does not modify the previous state', () => {
      expect(initialState).to.deep.equal({
        currentUser: {},
      });
    });

  });
})
