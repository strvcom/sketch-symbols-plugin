import { combineReducers } from 'redux'

// Import reducers
import settings from './settings'
import symbols from './symbols'

export default combineReducers({
  settings,
  symbols,
})
