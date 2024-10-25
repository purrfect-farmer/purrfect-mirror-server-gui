import { contextBridge } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { shell } from 'electron/common'

// Custom APIs for renderer
const api = {
  startServer() {
    return electronAPI.ipcRenderer.invoke('start-server')
  },
  stopServer() {
    return electronAPI.ipcRenderer.invoke('stop-server')
  },
  getServerState() {
    return electronAPI.ipcRenderer.invoke('get-server-state')
  },
  openExternalLink(url) {
    shell.openExternal(url)
  }
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    // contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // window.electron = electronAPI
  window.api = api
}
