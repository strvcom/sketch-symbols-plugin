/* globals window */
import { SET_SYMBOLS, SUCCESS } from '../../shared-actions'
import { setSymbols, setSuccess } from './redux/reducers/symbols'

export default function(dispatch) {
  /**
   * Bridge function that allows the plugin to send data to the
   * web view by calling this function.
   * It is globally defined on the window object in index.js!
   * Needs to be imported in the App component otherwise Sketch crashes
   */
  window.sketchBridge = jsonData => {
    switch (jsonData.name) {
      case SET_SYMBOLS:
        return dispatch(setSymbols(jsonData.payload))
      case SUCCESS:
        return dispatch(setSuccess(jsonData.payload))
      default:
        return console.error(
          new Error('unknown action received from the bridge')
        )
    }
  }
}
