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
      '@/assets/css/searchResult.css'
    ],
    script: [
      { src: '@/assets/js/jquery-slim.min.js' },
      { src: '@/assets/js/popper.min.js' },
      { src: '@/assets/js/bootstrap.min.js' }
    ],
    images: [
      '@/assets/images/background-medium.jpg',
      '@/assets/images/defaultAnimal.png',
      '@/assets/images/male.png',
      '@/assets/images/female.png',
      '@/assets/images/question.png',
      '@/assets/images/title.png',
    ],
    app: {
        head: {
          meta: [
            // <meta name="viewport" content="width=device-width, initial-scale=1">
            { name: 'viewport', content: 'width=device-width, initial-scale=1' }
          ],
      }
    }
})
