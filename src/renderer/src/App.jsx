import copy from 'copy-to-clipboard'
import toast, { Toaster } from 'react-hot-toast'
import { CgSpinner } from 'react-icons/cg'
import { HiCheckCircle } from 'react-icons/hi2'
import { IoCopyOutline } from 'react-icons/io5'
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
        'flex items-center justify-center gap-1',
        'p-2 font-bold',
        'hover:bg-orange-500 hover:text-white',
        'font-turret-road',
        props.className
      )}
    >
      {props.children}
    </a>
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

  const copyAddress = useCallback((address) => {
    copy(address)
    toast.success('Copied!')
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
        <div className="flex flex-col items-center gap-3 p-4 my-2">
          {isRunning !== null ? (
            <>
              <img src={AppIcon} className="h-28" />

              <div className="flex flex-col gap-1 text-center">
                <h1 className="text-2xl leading-none font-turret-road">{import.meta.env.VITE_APP_ORG}</h1>
                <h2 className="text-3xl leading-none text-orange-500 font-turret-road">
                  {import.meta.env.VITE_APP_SHORT_NAME}
                </h2>
              </div>

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
                      <HiCheckCircle className="text-orange-500 size-5 shrink-0" />
                      <h4 className="font-bold text-orange-800 grow">{address}</h4>
                      <button
                        className="text-orange-700 shrink-0"
                        onClick={() => copyAddress(address)}
                      >
                        <IoCopyOutline />
                      </button>
                    </div>
                  ))}
                </div>
              ) : null}

              {/* Connect */}
              <div
                className={cn(
                  'grid grid-cols-3 text-center',
                  'rounded-full',
                  'bg-orange-200 text-orange-800',
                  'divide-x divide-orange-300',
                  'overflow-clip'
                )}
              >
                <ContactLink href={import.meta.env.VITE_APP_DEV_CONTACT}>Dev</ContactLink>
                <ContactLink href={import.meta.env.VITE_APP_TELEGRAM_CHANNEL}>Channel</ContactLink>
                <ContactLink href={import.meta.env.VITE_APP_TELEGRAM_GROUP}>Group</ContactLink>
              </div>

              <div className="text-lg text-center text-orange-800 font-turret-road">v0.0.1</div>
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
