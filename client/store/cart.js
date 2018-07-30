import axios from 'axios'

/**
 * ACTION TYPES
 */
export const SET_CART_ITEMS = 'SET_CART_ITEMS'
export const ADD_CART_ITEM = 'ADD_CART_ITEM'
export const PAY_CART = 'PAY_CART'

/**
 * INITIAL STATE
 */
const InitialState = {
  list: [],
  count: 0,
  totalAmount: 0,
  paid: true,
}

/**
 * ACTION CREATORS
 */
export const setCartItems = cartItems => ({type: SET_CART_ITEMS, cartItems})
export const addCartItem = cartItem => ({type: ADD_CART_ITEM, cartItem})

export const payCart = () => ({type: PAY_CART})

/**
 * THUNK CREATORS
 */
export const fetchCartItems = (userId) => async dispatch => {
  try {
    const {data} = await axios.get(`/api/cart/${userId}`);
    dispatch(setCartItems(data))
  } catch (err) {
    console.error(err)
  }
}

export const postCartItem = (userId, cartItem) => async dispatch => {
  try {
    await axios.post('/api/cart', {userId: userId, cartItem});
    const {data} = await axios.get(`/api/cart/${userId}`);
    dispatch(setCartItems(data))
  } catch (err) {
    console.error(err)
  }
}

export const payCartItems = (userId) => async dispatch => {
  try {
    await axios.put(`/api/cart/checkout/${userId}`);
    dispatch(payCart());
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
      console.log(action.cartItems)
      return {
        ...state,
        list: action.cartItems,
        paid: action.cartItems.length === 0,
        count: action.cartItems.length,
        totalAmount: action.cartItems.reduce((acc, curr) => {
          return Number(acc) + (curr.quantity * Number(curr.animal.price) / 100)
        }, 0)
      }

    case ADD_CART_ITEM:
      return {
        ...state,
        paid: false,
        list: [...state.list, action.cartItem],
      }

    case PAY_CART:
      return InitialState;

    default:
      return state
  }
}
