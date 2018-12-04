/* globals MSTheme, log */
/* eslint-disable global-require, no-console */
import Settings from 'sketch/settings' // eslint-disable-line
import BrowserWindow from 'sketch-module-web-view'
import sketch from 'sketch' // eslint-disable-line
import { SET_SYMBOLS, SUCCESS } from '../shared-actions'
import getAllSymbols from './get-all-symbols'
import insertSymbols from './insert-symbols'
import renameSymbol from './rename-symbol'

export default function() {
  // default WebView settings
  const browserWindow = new BrowserWindow({
    identifier: 'symbols',
    title: 'Symbols Manager',
    width: 1140,
    height: 760,
    minimizable: false,
    maximizable: false,
    fullscreenable: false,
    resizable: false,
    show: false,
    alwaysOnTop: true,
    acceptFirstMouse: true,
  })

  // load html template
  browserWindow.loadURL(require('../resources/webview.html'))
  // sets the window theme according to osx setting
  const settings = {
    theme:
      typeof MSTheme !== 'undefined' && MSTheme.sharedTheme().isDark()
        ? 'dark'
        : 'light',
  }

  browserWindow.webContents.insertJS(
    `window.initialSettings = ${JSON.stringify(settings)}`
  )

  browserWindow.once('ready-to-show', () => {
    browserWindow.show()
  })

  const { webContents } = browserWindow

  // sennd some message to sketch or log
  webContents.on('nativeLog', s => {
    sketch.UI.message(s)
    log(s)
  })

  // listen to getSymbols from React
  // and send back data
  webContents.on('getSymbols', () => {
    const state = getAllSymbols()

    webContents
      .executeJavaScript(
        `sketchBridge(${JSON.stringify({ name: SET_SYMBOLS, payload: state })})`
      )
      .catch(console.error)
  })

  // listen to insertSymbol and execute plugin
  // function to create new symbol instance
  webContents.on('insertSymbol', symbols => {
    const message = insertSymbols(symbols)

    webContents
      .executeJavaScript(
        `sketchBridge(${JSON.stringify({
          name: SUCCESS,
          payload: message,
        })})`
      )
      .catch(console.error)
  })

  webContents.on('symbolRename', symbol => {
    const message = renameSymbol(symbol)

    webContents
      .executeJavaScript(
        `sketchBridge(${JSON.stringify({
          name: SUCCESS,
          payload: message,
        })})`
      )
      .catch(console.error)
  })
}
