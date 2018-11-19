/* globals NSWorkspace, MSTheme, log */
/* eslint-disable global-require, no-console */
import Settings from 'sketch/settings' // eslint-disable-line
import BrowserWindow from 'sketch-module-web-view'
import sketch from 'sketch' // eslint-disable-line
import { SET_SYMBOLS } from '../shared-actions'
import getAllSymbols from './get-all-symbols'
import insertSymbols from './insert-symbols'

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

  webContents.on('openFile', file => {
    NSWorkspace.sharedWorkspace().openFile(file)
  })

  webContents.on('nativeLog', s => {
    sketch.UI.message(s)
    log(s)
  })

  // listen to getSymbols from React
  // send back data
  webContents.on('getSymbols', () => {
    const state = getAllSymbols()

    webContents
      .executeJavaScript(
        `sketchBridge(${JSON.stringify({ name: SET_SYMBOLS, payload: state })})`
      )
      .catch(console.error)
  })

  webContents.on('insertSymbol', symbols => {
    insertSymbols(symbols)
  })
}
