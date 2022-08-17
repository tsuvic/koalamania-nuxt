import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    ssr: false,
    app: {
        head: {
          meta: [
            // <meta name="viewport" content="width=device-width, initial-scale=1">
            { name: 'viewport', content: 'width=device-width, initial-scale=1' }
          ],
          script: [
            // <script src="https://myawesome-lib.js"></script>
            { src: '/js/jquery-slim.min.js' },
            { src: '/js/popper.min.js' },
            { src: '/js/bootstrap.min.js' }
          ],
          link: [
            // <link rel="stylesheet" href="https://myawesome-lib.css">
            { rel: 'stylesheet', href: '/css/bootstrap.min.css' },
            { rel: 'stylesheet', href: '/css/starter-template.css' },
            { rel: 'stylesheet', href: '/css/background.css' },
            { rel: 'stylesheet', href: '/css/common.css' },
            { rel: 'stylesheet', href: '/css/index.css' },
            { rel: 'stylesheet', href: '/css/searchResult.css' }
          ]
      }
    }
})
