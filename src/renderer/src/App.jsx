import toast, { Toaster } from 'react-hot-toast'
import { CgSpinner } from 'react-icons/cg'
import { HiCheckCircle } from 'react-icons/hi2'
import { useCallback, useEffect, useState } from 'react'

import AppIcon from './assets/images/icon-unwrapped-cropped.png'
import { cn } from './lib/utils'

function ContactLink(props) {
  return (
    <a
      {...props}
      target="_blank"
      rel="noreferrer"
      className={cn(
        'px-2 py-1 rounded-full bg-orange-200 text-orange-800 hover:bg-orange-500 hover:text-white',
        props.className
      )}
    />
  )
}

function App() {
  const [isRunning, setIsRunning] = useState(null)
  const [addresses, setAddresses] = useState(null)

  const handleStartServer = useCallback(() => {
    /** Close Previous Toast */
    toast.dismiss()

    /** Create Toast */
    toast.promise(
      window.api.startServer().then((addresses) => {
        setIsRunning(true)
        setAddresses(addresses)
      }),
      {
        success: 'Server Started',
        loading: 'Starting...',
        error: 'Failed to Start Server'
      }
    )
  }, [setAddresses, setIsRunning])

  const handleStopServer = useCallback(() => {
    /** Close Previous Toast */
    toast.dismiss()

    /** Create Toast */
    toast.promise(
      window.api.stopServer().then(() => {
        setAddresses(null)
        setIsRunning(false)
      }),
      {
        success: 'Server Stopped',
        loading: 'Stopping...',
        error: 'Failed to Stop Server'
      }
    )
  }, [])

  /** Get Server State */
  useEffect(() => {
    window.api.getServerState().then(({ status, addresses }) => {
      setIsRunning(status)
      setAddresses(addresses)
    })
  }, [setIsRunning, setAddresses])

  return (
    <>
      <div className="flex flex-col justify-center overflow-auto h-dvh">
        <div className="flex flex-col items-center gap-2 p-4 my-2">
          {isRunning !== null ? (
            <>
              <img src={AppIcon} className="h-28" />

              <h1 className="text-2xl font-turret-road">Purrfect Server</h1>

              {/* Toggle Button */}
              <button
                className={cn(
                  'px-4 py-1.5 rounded-full text-white',
                  !isRunning ? 'bg-orange-500' : 'bg-red-500'
                )}
                onClick={!isRunning ? handleStartServer : handleStopServer}
              >
                {!isRunning ? 'Start Server' : 'Stop Server'}
              </button>

              {/* Addresses */}
              {addresses ? (
                <div className="flex flex-col w-full gap-2 p-4 bg-orange-200 rounded-xl">
                  {addresses.map((address, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <HiCheckCircle className="w-5 h-5 text-orange-500" />
                      <span className="font-bold text-orange-800">{address}</span>
                    </div>
                  ))}
                </div>
              ) : null}

              {/* Connect */}
              <div className="grid grid-cols-2 gap-1 text-center">
                <ContactLink href="https://wa.me/2349018646163">Dev</ContactLink>
                <ContactLink href="https://t.me/purrfect_community">Channel</ContactLink>
              </div>

              <div className="text-center text-orange-800">v0.0.1</div>
            </>
          ) : (
            <CgSpinner className="w-5 h-5 mx-auto animate-spin" />
          )}
        </div>
      </div>

      <Toaster position="top-center" />
    </>
  )
}

export default App
