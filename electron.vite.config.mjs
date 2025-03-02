import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { ViteEjsPlugin } from 'vite-plugin-ejs'
import { defineConfig, externalizeDepsPlugin, loadEnv } from 'electron-vite'
import { resolve } from 'path'

export default defineConfig(({ mode }) => {
  /** Env */
  const env = loadEnv(mode, process.cwd())

  return {
    main: {
      plugins: [externalizeDepsPlugin()]
    },
    preload: {
      plugins: [externalizeDepsPlugin()]
    },
    renderer: {
      resolve: {
        alias: {
          '~@fontsource': '@fontsource',
          '@renderer': resolve('src/renderer/src')
        }
      },
      plugins: [/** Plugins */ ViteEjsPlugin(env), tailwindcss(), react()]
    }
  }
})
