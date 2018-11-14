/* globals NSWorkspace, MSTheme */
/* eslint-disable global-require, no-console */
import Settings from 'sketch/settings' // eslint-disable-line
import BrowserWindow from 'sketch-module-web-view'
import sketch from 'sketch' // eslint-disable-line

export default function(context) {
  // default WebView settings
  const browserWindow = new BrowserWindow({
    identifier: 'symbols',
    title: 'Symbols Manager',
    width: 1024,
    height: 640,
    minimizable: false,
    maximizable: false,
    alwaysOnTop: true,
    fullscreenable: false,
    acceptFirstMouse: true,
    resizable: true,
    show: false,
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

  // Functions
  const document = sketch.fromNative(context.document)
  const symbols = document.getSymbols()

  const logNames = something => {
    something.map(s => console.log(s.name))
  }

  logNames(symbols)

  browserWindow.once('ready-to-show', () => {
    browserWindow.show()
  })

  const { webContents } = browserWindow

  webContents.on('openFile', file => {
    NSWorkspace.sharedWorkspace().openFile(file)
  })

  webContents.on('logger', message => console.log(message))
}
