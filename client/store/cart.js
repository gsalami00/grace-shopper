import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
export const SET_CART_ITEMS = 'SET_CART_ITEMS';
export const ADD_CART_ITEM = 'ADD_CART_ITEM';

/**
 * INITIAL STATE
 */
const InitialState = {
  list: [],
  count: 0,
}

/**
 * ACTION CREATORS
 */
export const setCartItems = (cartItems) => ({type: SET_CART_ITEMS, cartItems});
export const addCartItem = (cartItem) => ({type: ADD_CART_ITEM, cartItem});

/**
 * THUNK CREATORS
 */
export const fetchCartItems = () => async dispatch => {
  try {
    const { data } = await axios.get('/api/cart');
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

    case ADD_CART_ITEM:
      return {...state, list: [...state.list, action.cartItem], count: state.count + 1};

    default:
      return state
  }
}
