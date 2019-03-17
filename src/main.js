/* globals log */
/* eslint-disable global-require, no-console */
import Settings from 'sketch/settings' // eslint-disable-line
import BrowserWindow from 'sketch-module-web-view'
import sketch from 'sketch' // eslint-disable-line
import { SET_SYMBOLS, SUCCESS } from '../shared-actions'
import getAllSymbols from './getAllSymbols'
import insertSymbols from './insertSymbols'
import renameSymbol from './renameSymbol'
import CreateSymbolState from './store'
import { CREATE_SYMBOL, SELECTION_CHANGED } from './constants'

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
    webPreferences: {
      devTools: true,
    },
  })

  const store = new CreateSymbolState()
  log('Main function store initialized')

  // load html template
  browserWindow.loadURL(require('../resources/webview.html'))
  // sets the window theme according to osx setting
  const settings = {
    theme: 'light',
    // prep for dark design
    // theme:
    //   typeof MSTheme !== 'undefined' && MSTheme.sharedTheme().isDark()
    //     ? 'light'
    //     : 'light',
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

  webContents.on('logger', message => {
    log(message)
  })

  /* 
    This function serves as a bridge to this main and allways running function. It needs a opened webview to trigger live responses to other functions.
    Like for ex. reload on creation of a new symbol.
  */
  webContents.on('mainFunctionBridge', payload => {
    if (payload === CREATE_SYMBOL && !store.getSymbolCreatedSwitch()) {
      store.setSymbolCreatedTrue()
    }
    if (payload === SELECTION_CHANGED && store.getSymbolCreatedSwitch()) {
      store.setSymbolCreatedFalse()
      const refreshedSymbols = getAllSymbols()
      webContents
        .executeJavaScript(
          `sketchBridge(${JSON.stringify({
            name: SET_SYMBOLS,
            payload: refreshedSymbols,
          })})`
        )
        .catch(console.error)
    }
  })

  /* 
    listen to getSymbols from React
    and send back data
  */
  webContents.on('getSymbols', () => {
    const state = getAllSymbols()

    webContents
      .executeJavaScript(
        `sketchBridge(${JSON.stringify({ name: SET_SYMBOLS, payload: state })})`
      )
      .catch(console.error)
  })

  /* 
    listen to insertSymbol and execute plugin
    function to create new symbol instance
  */
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

  /* 
    listen to symbolRename and execute plugin
    function to rename a symbol
  */
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
