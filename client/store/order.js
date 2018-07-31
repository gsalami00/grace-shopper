import axios from 'axios'

export const GET_ORDERS = 'GET_ORDERS'

const initialState = {
  orders: []
}

export const getOrders = orders => ({type: GET_ORDERS, orders})

export const getOrderHistory = userId => async dispatch => {
  try {
    const res = await axios.get(`/api/order/${userId}`)
    dispatch(getOrders(res.data))
  } catch (error) {
    console.error(error)
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ORDERS:
      return {...state, orders: action.orders}
    default:
      return state
  }
}
