import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers'
import middlewares from './middlewares'

const store = applyMiddleware(...middlewares)(createStore)(rootReducer)

export default store
