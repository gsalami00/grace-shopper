/**
 * ACTION TYPES
 */
export const SET_MODAL = 'SET_MODAL';
export const SET_CHECKOUT_MODAL = 'SET_CHECKOUT_MODAL';

/**
 * INITIAL STATE
 */
const InitialState = {
  showModal: false,
  checkoutModal: true,
}

// /**
//  * ACTION CREATORS
//  */
export const modal = (bool) => ({type: SET_MODAL, showModal: bool});
export const checkoutModal = (bool) => ({type: SET_CHECKOUT_MODAL, checkoutModal: bool});

// /**
//  * REDUCER
//  */
export default function(state = InitialState, action) {
  switch (action.type) {
    case SET_MODAL:
      return {
        ...state,
        showModal: action.showModal,
        checkoutModal: action.showModal,
      };

    case SET_CHECKOUT_MODAL:
      return {
        ...state,
        checkoutModal: action.checkoutModal
      }

    default:
      return state
  }
}
