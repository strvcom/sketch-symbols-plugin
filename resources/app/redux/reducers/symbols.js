import { SET_SYMBOLS } from '../../../../shared-actions'

const FETCH_SYMBOLS = 'symbols/FETCH_SYMBOLS'

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

export default function(state = initialState, action) {
  if (handlers[action.type]) {
    return handlers[action.type](state, action)
  }
  return state
}
