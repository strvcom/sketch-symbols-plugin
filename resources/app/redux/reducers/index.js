import { combineReducers } from 'redux'

// Import reducers
import settings from './settings'
import symbols from './symbols'
import helpers from './helpers'

export default combineReducers({
  settings,
  symbols,
  helpers,
})
