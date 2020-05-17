const pkg = require('./package')
import axios from 'axios'
module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.description,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description },
      { 'http-equiv': 'x-ua-compatible', content: 'ie=edge' },
      { name: 'msapplication-TileColor', content: '#ffffff' },
      { name: 'msapplication-TileImage', content: '/ms-icon-144x144.png' },
      { name: 'theme-color', content: '#ffffff' },

      // Facebook open graph
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'https://example.com/page.html' },
      { property: 'og:title', content: 'Content Title' },
      { property: 'og:image', content: 'https://example.com/image.jpg' },
      { property: 'og:description', content: 'Description Here' },
      { property: 'og:site_name', content: 'Site Name' },
      { property: 'og:locale', content: 'en_US' },

      // Twitter card
      { property: 'twitter:card', content: 'summary' },
      { property: 'twitter:site', content: '@site_account' },
      { property: 'twitter:creator', content: '@individual_account' },
      { property: 'twitter:url', content: 'https://example.com/page.html' },
      { property: 'twitter:title', content: 'Content Title' },
      { property: 'twitter:description', content: 'Content description less than 200 characters' },
      { property: 'twitter:image', content: 'https://example.com/image.jpg' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/android-icon-192x192.png' },
      { rel: 'icon', type: 'image/png', sizes: '96x96', href: '/favicon-96x96.png' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
      { rel: 'apple-touch-icon', sizes: '57x57', href: '/apple-icon-57x57.png' },
      { rel: 'apple-touch-icon', sizes: '60x60', href: '/apple-icon-60x60.png' },
      { rel: 'apple-touch-icon', sizes: '72x72', href: '/apple-icon-72x72.png' },
      { rel: 'apple-touch-icon', sizes: '76x76', href: '/apple-icon-76x76.png' },
      { rel: 'apple-touch-icon', sizes: '114x114', href: '/apple-icon-114x114.png' },
      { rel: 'apple-touch-icon', sizes: '120x120', href: '/apple-icon-120x120.png' },
      { rel: 'apple-touch-icon', sizes: '144x144', href: '/apple-icon-144x144.png' },
      { rel: 'apple-touch-icon', sizes: '152x152', href: '/apple-icon-152x152.png' },
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-icon-180x180.png' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons'
      }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
    {
      src: 'bulma/bulma.sass',
      lang: 'sass'
    },
  ],

  /*
  ** Plugins to load before mounting the App
    plugins: [{ src: '~plugins/vuetify.js', ssr: false }, { src: '~/plugins/localStorage.js', ssr: false }, {
    src: './plugins/googleAnalytics.js',
    mode: 'client'
  }],
  */

  plugins: [{ src: '~plugins/vuetify.js', ssr: false }, { src: '~/plugins/localStorage.js', ssr: false },
  {
    src: './plugins/googleAnalytics.js',
    mode: 'client'
  }],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    '@nuxtjs/vuetify',
    'nuxt-shopify'
  ],

  shopify: {
    /**
     * Your shopify domain
     */
    domain: 'derneuesitemshop.myshopify.com/',

    /**
     * Your shopify storefront access token
     */
    storefrontAccessToken: '0243067c912abe3a8d853fdaec78203c',

    /**
     * This will be larger than the optimized version, as it will contain all fields that are available in the
     * Storefront API. (https://help.shopify.com/en/api/custom-storefronts/storefront-api/reference)
     * This should only be used when you need to add custom queries to supplement the JS Buy SDK queries.
     */
    unoptimized: false,
  },
  auth: {
    redirect: {

      // logout: '/logout', // redirect user when not connected
      callback: '/callback'
    },
    // Options
    strategies: {
      local: false,
      auth0: {
        domain: 'hypezhop.eu.auth0.com',
        client_id: 'jOpZ4JozQIu2Gwv4Nbtn97aFBF0UV2ap',
      }
    }
  },
  vuetify: {
    /* module options */
  },
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  // generate: {
  //   routes() {

  //     var API_URL =
  //       "https://derneuesitemshop.myshopify.com/api/2020-01/graphql.json";

  //     return axios.post(
  //       API_URL,
  //       {
  //         query: `{
  //   collectionByHandle(handle: "Fitness") {
  //   id,
  //   products(first:100){
  //       edges{
  //           node{
  //               id
  //           }
  //       }
  //   }
  //   }
  //   }
  // `
  //       },
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           "x-shopify-storefront-access-token":
  //             "0243067c912abe3a8d853fdaec78203c"
  //         }
  //       }
  //     ).then((res) => {
  //       // Do something with the collections
  //       //Currently fetching only one collection
  //       console.log(res.data)
  //       console.log(typeof (res.data))
  //       var collection = res.data.data.collectionByHandle.products.edges
  //       console.log(collection)
  //       return collection.map((product) => {
  //         return '/product_detail/' + product.node.id
  //       })
  //     })
  //     // return axios.get('https://my-api/users')
  //     //   .then((res) => {
  //     //     return res.data.map((user) => {
  //     //       return '/product_detail/' + user.id
  //     //     })
  //     //   })
  //   }
  // }
  // generate: {
  //   routes() {
  //     return axios.get('https://reqres.in/api/users?page=2')
  //       .then((res) => {
  //         return res.data.map((user) => {
  //           return '/prodcut_id/' + user.id
  //         })
  //       })
  //   }
  // }
  // buildModules: [
  //   ['@nuxtjs/google-analytics', {
  //     id: 'UA-163421171-1',
  //     checkDuplicatedScript: true,
  //     autoTracking: {
  //       pageviewTemplate(route) {
  //         return {
  //           page: route.path,
  //           title: document.title,
  //           location: window.location.href
  //         }
  //       }
  //     },
  //     debug: {
  //       enabled: true,
  //       sendHitTask: true
  //     },
  //     ecommerce: {
  //       enabled: true,
  //       enhanced: true
  //     }
  //   }]
  // ]
}
