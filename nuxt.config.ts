import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    ssr: false,

    //https://zenn.dev/one_dock/articles/64bd100b83074b
    css: [
      '@/assets/css/bootstrap.min.css',
      '@/assets/css/starter-template.css',
      '@/assets/css/background.css',
      '@/assets/css/common.css',
      '@/assets/css/index.css',
      '@/assets/css/searchResult.css',
    ],
    app: {
        head: {
          meta: [
            // <meta name="viewport" content="width=device-width, initial-scale=1">
            { name: 'viewport', content: 'width=device-width, initial-scale=1' }
          ],
          script: [
            { src: '/js/jquery-slim.min.js' },
            { src: '/js/popper.min.js' },
            { src: '/js/bootstrap.min.js' }
          ]
      }
    },
    build: {
      transpile: ['vuetify'],
    },
    vite: {
      define: {
        'process.env.DEBUG': false,
      },
    },
})
