import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
export const SET_DATA_KEY = 'SET_DATA_KEY';
export const SET_DATA_AMOUNT = 'SET_DATA_AMOUNT';
export const SET_DATA_DESCRIPTION = 'SET_DATA_DESCRIPTION';
export const ADD_CART_ITEM = 'ADD_CART_ITEM';

/**
 * INITIAL STATE
 */
const InitialState = {
  data_key: "",
  data_amount: "",
  data_name: "Stripe.com",
  data_description: "Example charge",
  data_image: "https://stripe.com/img/documentation/checkout/marketplace.png",
  data_locale: "auto",
  data_zip_code: "true",
}

/**
 * ACTION CREATORS
 */
export const setCartItems = (cartItems) => ({type: SET_CART_ITEMS, cartItems});
export const addCartItem = (cartItem) => ({type: ADD_CART_ITEM, cartItem});

/**
 * THUNK CREATORS
 */


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
