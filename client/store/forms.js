/**
 * ACTION TYPES
 */
export const SET_MODAL = 'SET_MODAL';

/**
 * INITIAL STATE
 */
const InitialState = {
  showModal: false
}

// /**
//  * ACTION CREATORS
//  */
export const modal = (bool) => ({type: SET_MODAL, showModal: bool});

// /**
//  * THUNK CREATORS
//  */

// /**
//  * REDUCER
//  */
export default function(state = InitialState, action) {
  switch (action.type) {
    case SET_MODAL:
      return {...state, showModal: action.showModal};
    default:
      return state
  }
}
