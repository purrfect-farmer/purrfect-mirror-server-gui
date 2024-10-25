import { createSyncServer } from './libs/sync'

let sync = null

/** Start Server */
export function startSyncServer() {
  return new Promise((resolve, reject) => {
    createSyncServer()
      .then((data) => {
        /** Store Server */
        sync = data

        /** Resolve Addresses */
        resolve(sync.addresses)
      })
      .catch(() => reject({ status: false }))
  })
}

/** Close Server */
export async function stopSyncServer() {
  if (sync) {
    await sync.io.close()
    sync = null
  }
}

/** Get Server State */
export function getSyncServerState() {
  return {
    status: sync !== null,
    addresses: sync?.addresses
  }
}
