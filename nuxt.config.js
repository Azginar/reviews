export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'app-rewiews',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@assets/fonts.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    'nuxt-svg-loader',
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    ['@nuxtjs/firebase',
      {
        config: {
          apiKey: "AIzaSyCWxTiKhp6kKxyTN8VmAsu5WfCddcv2teo",
          authDomain: "reviews-162e1.firebaseapp.com",
          projectId: "reviews-162e1",
          storageBucket: "reviews-162e1.appspot.com",
          messagingSenderId: "75656602298",
          appId: "1:75656602298:web:c5d712583fae00ef3a5883",
          measurementId: "G-Y2BMV3S5J7"
        },
        services: {
          auth: {
            initialize: {
              onAuthStateChangedMutation: 'ON_AUTH_STATE_CHANGED_MUTATION'
            },
          },
          //auth: true,
          firestore: true
        }
      }
    ]
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
