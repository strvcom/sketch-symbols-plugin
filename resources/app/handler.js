/* globals window */
import {
  SET_TREE,
  SET_PAGE_METADATA,
  SET_LAYER_METADATA,
} from '../../shared-actions'
import {
  setTree,
  setLayerMetadata,
  setPageMetadata,
} from './redux/ducks/elements'

export default function(dispatch) {
  /**
   * Bridge function that allows the plugin to send data to the
   * web view by calling this function.
   * It is globally defined on the window object in index.js!
   */
  window.sketchBridge = jsonData => {
    switch (jsonData.name) {
      case SET_TREE:
        return dispatch(setTree(jsonData.payload))
      case SET_PAGE_METADATA:
        return dispatch(setPageMetadata(jsonData.payload))
      case SET_LAYER_METADATA:
        return dispatch(setLayerMetadata(jsonData.payload))
      default:
        return console.error(
          new Error('unknown action received from the bridge')
        )
    }
  }
}
