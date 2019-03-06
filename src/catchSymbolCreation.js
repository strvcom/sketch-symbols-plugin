/* eslint-disable no-console */
import sketch from 'sketch/dom' // eslint-disable-line
import { getWebview } from 'sketch-module-web-view/remote'
import { MAIN_FUNCTION_BRIDGE } from '../shared-actions'
import { CREATE_SYMBOL, SELECTION_CHANGED } from './constants'

/* 
  This function is a two part process. Since sketch trigers a action when you click to create new symbol you can still cancel it when naming the symbol. Only after you finish naming the symbol, the process is truly finished. Therefore you need to listen to selection change which comes right after the symbol creation.
*/
// eslint-disable-next-line
export function refreshOnCreate() {
  const existingWebview = getWebview('symbols')

  if (existingWebview) {
    const { webContents } = existingWebview
    webContents
      .executeJavaScript(
        `sketchBridge(${JSON.stringify({
          name: MAIN_FUNCTION_BRIDGE,
          payload: CREATE_SYMBOL,
        })})`
      )
      .catch(console.error)
  }
}

export function getUpdatedSymbols() {
  const existingWebview = getWebview('symbols')

  if (existingWebview) {
    const { webContents } = existingWebview
    webContents
      .executeJavaScript(
        `sketchBridge(${JSON.stringify({
          name: MAIN_FUNCTION_BRIDGE,
          payload: SELECTION_CHANGED,
        })})`
      )
      .catch(console.error)
  }
}
