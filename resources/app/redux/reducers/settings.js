/* globals window */
const UPDATE_SETTING = 'settings/UPDATE_SETTING'

const initialState = window.initialSettings || {
  alwaysOnTop: false,
  theme: 'light',
}

const handlers = {}

const updateSettingAction = key => value => ({
  type: UPDATE_SETTING,
  payload: {
    key,
    value,
  },
  meta: {
    sketch: ['setSetting', key, value],
  },
})

handlers[UPDATE_SETTING] = (state, { payload }) => ({
  ...state,
  [payload.key]: payload.value,
})

export const updateAlwaysOnTop = updateSettingAction('alwaysOnTop')
export const updateTheme = updateSettingAction('theme')

export default function(state = initialState, action) {
  if (handlers[action.type]) {
    return handlers[action.type](state, action)
  }

  return state
}
