import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import { reducer as formReducer } from 'redux-form';
import user from './user'
import cart from './cart'
import animals from './animals'
import forms from './forms'

const reducer = combineReducers({
  form: formReducer,
  user,
  animals,
  cart,
  forms
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './animals'
export * from './cart'
