import { SET_SYMBOLS, SUCCESS } from '../../../../shared-actions'

const FETCH_SYMBOLS = 'symbols/FETCH_SYMBOLS'
const SELECT_SYMBOLS = 'symbols/SELECT_SYMBOLS'

const initialState = {
  loading: false,
  symbols: [],
}

const handlers = {}

export const fetchSymbols = () => ({
  type: FETCH_SYMBOLS,
  meta: {
    sketch: ['getSymbols'],
  },
})

handlers[FETCH_SYMBOLS] = state => ({
  ...state,
  loading: true,
})

export const setSymbols = symbols => ({
  type: SET_SYMBOLS,
  payload: {
    symbols,
  },
})

handlers[SET_SYMBOLS] = (state, { payload }) => ({
  ...state,
  symbols: payload.symbols,
  loading: false,
})

export const selectSymbols = symbols => ({
  type: SELECT_SYMBOLS,
  meta: {
    sketch: ['insertSymbol', symbols],
  },
})

export const setSuccess = message => ({
  type: SUCCESS,
  payload: {
    message,
  },
})

handlers[SUCCESS] = (state, { payload }) => ({
  ...state,
  message: payload.message,
})

export default function(state = initialState, action) {
  if (handlers[action.type]) {
    return handlers[action.type](state, action)
  }
  return state
}
