import {
  SET_SYMBOLS,
  SUCCESS,
  SET_SYMBOL_CREATED,
} from '../../../../shared-actions'
// import store from '../store'

const FETCH_SYMBOLS = 'symbols/FETCH_SYMBOLS'
const SELECT_SYMBOLS = 'symbols/SELECT_SYMBOLS'
const RENAME_SYMBOL = 'symbols/RENAME_SYMBOL'
const MESSAGE = 'symbols/MESSAGE'
const BACK_TO_MAIN = 'symbols/BACK_TO_MAIN'

const initialState = {
  loading: false,
  symbolCreated: false,
  symbols: [],
}

const handlers = {}

/* 
  actions called from app to backend (Sketch), hence the meta.
*/
export const logSomething = message => ({
  type: MESSAGE,
  meta: {
    sketch: ['logger', message],
  },
})

export const mainThreadBridge = payload => ({
  type: BACK_TO_MAIN,
  meta: {
    sketch: ['mainFunctionBridge', payload],
  },
})

export const fetchSymbols = () => ({
  type: FETCH_SYMBOLS,
  meta: {
    sketch: ['getSymbols'],
  },
})

export const selectSymbols = symbols => ({
  type: SELECT_SYMBOLS,
  meta: {
    sketch: ['insertSymbol', symbols],
  },
})

export const renameSymbol = symbol => ({
  type: RENAME_SYMBOL,
  meta: {
    sketch: ['symbolRename', symbol],
  },
})

// called from backend to app
export const setSymbols = symbols => ({
  type: SET_SYMBOLS,
  payload: {
    symbols,
  },
})

export const setSuccess = message => ({
  type: SUCCESS,
  payload: {
    message,
  },
})

// handlers
handlers[FETCH_SYMBOLS] = state => ({
  ...state,
  loading: true,
})

handlers[SET_SYMBOLS] = (state, { payload }) => ({
  ...state,
  symbols: payload.symbols,
  loading: false,
})

handlers[SUCCESS] = (state, { payload }) => ({
  ...state,
  message: payload.message,
})

handlers[SET_SYMBOL_CREATED] = (state, { payload }) => ({
  ...state,
  symbolCreated: payload,
})

// default export
export default function(state = initialState, action) {
  if (handlers[action.type]) {
    return handlers[action.type](state, action)
  }
  return state
}
