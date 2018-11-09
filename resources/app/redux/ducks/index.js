import { combineReducers } from 'redux'

// Import reducers
import elements from './elements'
import settings from './settings'

export default combineReducers({
  elements,
  settings,
})
