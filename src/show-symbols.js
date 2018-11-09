/* globals AppController, NSWorkspace, MSTheme */
/* eslint-disable global-require */
import Settings from 'sketch/settings' // eslint-disable-line
import BrowserWindow from 'sketch-module-web-view'
import { getWebview } from 'sketch-module-web-view/remote'
import { prepareValue } from 'sketch-utils'
import getSketchState, {
  getPageMetadata,
  getLayerMetadata,
} from './get-sketch-state'
import {
  SET_TREE,
  SET_PAGE_METADATA,
  SET_LAYER_METADATA,
  SET_SCRIPT_RESULT,
} from '../shared-actions'
import { identifier } from '../debugger'
import { runScript, clearScriptsCache, runCommand } from './run-script'

export default function() {
  const existingWebview = getWebview(identifier)
  if (existingWebview) {
    if (existingWebview.isVisible()) {
      // close the window if it's open
      existingWebview.close()
    }
    return
  }

  // default WebView settings
  const browserWindow = new BrowserWindow({
    identifier,
    width: 1024,
    height: 640,
    minWidth: 700,
    minHeight: 300,
    minimizable: false,
    maximizable: false,
    alwaysOnTop: true,
    fullscreenable: false,
    acceptFirstMouse: true,
    title: 'Symbols Manager',
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

    // uncomment to enabled listening to all the actions
    // AppController.sharedInstance()
    //   .pluginManager()
    //   .setWilcardsEnabled(true)
  })

  browserWindow.on('closed', () => {
    AppController.sharedInstance()
      .pluginManager()
      .setWilcardsEnabled(false)
  })

  browserWindow.webContents.on('openFile', file => {
    NSWorkspace.sharedWorkspace().openFile(file)
  })

  browserWindow.webContents.on('getSketchState', () => {
    const state = getSketchState()

    browserWindow.webContents
      .executeJavaScript(
        `sketchBridge(${JSON.stringify({ name: SET_TREE, payload: state })})`
      )
      .catch(console.error)
  })

  // browserWindow.webContents.on('setSetting', (key, value) => {
  //   Settings.setSettingForKey(key, value)

  //   if (String(key) === 'alwaysOnTop') {
  //     browserWindow.setAlwaysOnTop(value)
  //   }
  // })

  browserWindow.webContents.on('getPageMetadata', (pageId, docId) => {
    const state = getPageMetadata(pageId, docId)

    browserWindow.webContents
      .executeJavaScript(
        `sketchBridge(${JSON.stringify({
          name: SET_PAGE_METADATA,
          payload: { pageId, docId, state },
        })})`
      )
      .catch(console.error)
  })

  browserWindow.webContents.on('getLayerMetadata', (layerId, pageId, docId) => {
    const state = getLayerMetadata(layerId, pageId, docId)

    browserWindow.webContents
      .executeJavaScript(
        `sketchBridge(${JSON.stringify({
          name: SET_LAYER_METADATA,
          payload: { layerId, pageId, docId, state },
        })})`
      )
      .catch(console.error)
  })

  browserWindow.webContents.on('onRunScript', (script, runId) => {
    const result = runScript(script)
    browserWindow.webContents
      .executeJavaScript(
        `sketchBridge(${JSON.stringify({
          name: SET_SCRIPT_RESULT,
          payload: {
            result: prepareValue(result),
            id: runId,
          },
        })})`
      )
      .catch(console.error)
  })

  browserWindow.webContents.on('onRunCommand', (command, runId) => {
    runCommand(command)
      .catch(err => err)
      .then(result => {
        browserWindow.webContents
          .executeJavaScript(
            `sketchBridge(${JSON.stringify({
              name: SET_SCRIPT_RESULT,
              payload: {
                result: prepareValue(result || 'done'),
                id: runId,
              },
            })})`
          )
          .catch(console.error)
      })
  })

  browserWindow.webContents.on('clearScriptsCache', () => {
    clearScriptsCache()
  })
}
