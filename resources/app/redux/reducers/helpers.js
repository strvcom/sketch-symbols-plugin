const MESSAGE = 'helpers/MESSAGE'
const BACK_TO_MAIN = 'helpers/BACK_TO_MAIN'

const initialState = {}
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

// default export
export default function(state = initialState, action) {
  if (handlers[action.type]) {
    return handlers[action.type](state, action)
  }
  return state
}
