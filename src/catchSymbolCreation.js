/* eslint-disable no-console */
/* globals log */
import sketch from 'sketch/dom' // eslint-disable-line
import { getWebview } from 'sketch-module-web-view/remote'
import { MAIN_FUNCTION_BRIDGE } from '../shared-actions'
import { CREATE_SYMBOL, SELECTION_CHANGED } from './constants'

// eslint-disable-next-line
export function refreshOnCreate(context) {
  log('symbol created')

  // const action = context.actionContext
  // const currentDocument = sketch.fromNative(action.document)
  // they are not updated yet.
  // need to name it and after SelectionChanged
  // const symbols = currentDocument.getSymbols()

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
  log('selection')

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
