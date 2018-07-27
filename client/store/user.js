import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
export const GET_USER = 'GET_USER'
export const REMOVE_USER = 'REMOVE_USER'
export const EDIT_PROFILE = 'EDIT_PROFILE';
/**
 * INITIAL STATE
 */
const initialState = {
  currentUser: {}
}

const defaultUser = {}

/**
 * ACTION CREATORS
 */
export const getUser = user => ({type: GET_USER, user})
export const removeUser = () => ({type: REMOVE_USER})
export const editProfile = user => ({type: EDIT_PROFILE, user})

/**
 * THUNK CREATORS
 */
export const fetchUser = userId => async dispatch => {
  try {
    const res = await axios.get(`/users/${userId}`)
    dispatch(getUser(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const editUser = (userId, user) => async dispatch => {
  try {
    const updated = await axios.put(`/api/users/${userId}`, user)
    dispatch(editProfile(updated.data))
    history.push(`/users/${userId}`)
  } catch (err) {
    console.error(err)
  }
}

export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}

export const auth = (email, password, method) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, {email, password})
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }

  try {
    dispatch(getUser(res.data))
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return {...state, currentUser: action.user}
    case REMOVE_USER:
      return {...state, currentUser: defaultUser}
    case EDIT_PROFILE:
      return {...state, currentUser: action.user}
    default:
      return state
  }
}
