/* globals NSWorkspace, MSTheme */
/* eslint-disable global-require */
import Settings from 'sketch/settings' // eslint-disable-line
import BrowserWindow from 'sketch-module-web-view'

export default function() {
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

  browserWindow.webContents.on('openFile', file => {
    NSWorkspace.sharedWorkspace().openFile(file)
  })
}
