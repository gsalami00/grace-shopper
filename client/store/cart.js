import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const SET_CART_ITEMS = 'SET_CART_ITEMS';

/**
 * INITIAL STATE
 */
const InitialState = {
  list: [],
}

/**
 * ACTION CREATORS
 */
const setCartItems = (cartItems) => ({type: SET_CART_ITEMS, cartItems})

/**
 * THUNK CREATORS
 */
export const fetchCartItems = () => async dispatch => {
  try {
    const { data } = axios.get('/api/cart');
    dispatch(setCartItems(data));
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = InitialState, action) {
  switch (action.type) {
    case SET_CART_ITEMS:
      return {...state, list: action.cartItems};

    default:
      return state
  }
}