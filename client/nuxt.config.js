const pkg = require('./package')
import axios from 'axios'
import 'cross-fetch/polyfill'

const dynamicRoutes = async () => {

  var API_URL =
    "https://itemshoppinfo.myshopify.com/api/2020-01/graphql.json";

  var res = await axios.post(
    API_URL,
    {
      query: `{
collectionByHandle(handle: "Fitness") {
id,
products(first:40){
  edges{
      node{
          id
      }
  }
}
}
}
`
    },
    {
      headers: {
        "Content-Type": "application/json",
        "x-shopify-storefront-access-token":
          "36525a7f3f93cebcdf178ca9660fa06b"
      }
    })
  //console.log(res.data)
  var collection = res.data.data.collectionByHandle.products.edges
  //console.log(collection)




  const proxyurl = "https://cors-anywhere.herokuapp.com/";

  const url =
    "https://judge.me/api/v1/reviews?api_token=o7MuslGD6xMPV77IKMdRzfahVJ0&shop_domain=itemshoppinfo.myshopify.com"; // site that doesn’t send Access-Control-*
  // fetch(proxyurl + reviewAPI+ "&page=" + 1) // https://cors-anywhere.herokuapp.com/https://example.com
  //   .then(response => response.json())
  //   .then(contents => console.log(contents))
  //   .catch(() =>
  //     console.log("Can’t access " + url + " response. Blocked by browser?")
  //   );
  var reviewResponse = []
  for (var i = 1; i <= 24; i++) {
    var reviews = await axios.get(proxyurl + url + "&page=" + i, {
      headers: { "X-Requested-With": "https://fit.itemshopp.com" }
    });
    if (reviews.data.reviews.length > 0)

      reviewResponse.push(reviews.data.reviews)
  }



  let promises = [];
  for (var i = 0; i < collection.length; i++) {
    promises.push(axios.post(
      API_URL,
      {
        query: `fragment VariantFragment on ProductVariant  { id,title,price,priceV2 { amount,currencyCode },presentmentPrices (first: 20) { pageInfo { hasNextPage,hasPreviousPage },edges { node { price { amount,currencyCode },compareAtPrice { amount,currencyCode } } } },weight,available: availableForSale,sku,compareAtPrice,compareAtPriceV2 { amount,currencyCode },image { id,src: originalSrc,altText },selectedOptions { name,value },unitPrice { amount,currencyCode },unitPriceMeasurement { measuredType,quantityUnit,quantityValue,referenceUnit,referenceValue } },fragment ProductFragment on Product  { id,availableForSale,createdAt,updatedAt,descriptionHtml,description,handle,productType,title,vendor,publishedAt,onlineStoreUrl,options { id,name,values },images (first: 250) { pageInfo { hasNextPage,hasPreviousPage },edges { cursor,node { id,src,altText } } },variants (first: 250) { pageInfo { hasNextPage,hasPreviousPage },edges { cursor,node { ...VariantFragment } } } },query ($id:ID!)  { node (id: $id) { __typename,...ProductFragment } }`,
        variables: { id: collection[i].node.id }
      },
      {
        headers: {
          "Content-Type": "application/json",
          "x-shopify-storefront-access-token":
            "36525a7f3f93cebcdf178ca9660fa06b"
        }
      }
    ).then((response) => {
      //console.log('review inside axios' + JSON.stringify(reviewResponse))
      return {
        route: '/product_detail/' + response.data.data.node.id,
        payload: { response: response.data.data.node, reviews: reviewResponse }
      }
    }))
  }



  const r1 = await Promise.all(promises)
  return r1
}


// Do something with the collections
//Currently fetching only one collection
// console.log(res.data)
// console.log(typeof (res.data))
// var collection = res.data.data.collectionByHandle.products.edges
// console.log(collection)


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
      { rel: 'icon', type: 'image/x-icon', href: '/itemshopp.ico' },
      { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/itemshopp.ico' },
      { rel: 'icon', type: 'image/png', sizes: '96x96', href: '/itemshopp.ico' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/itemshopp.ico' },

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
    domain: 'itemshoppinfo.myshopify.com/',

    /**
     * Your shopify storefront access token
     */
    storefrontAccessToken: '36525a7f3f93cebcdf178ca9660fa06b',

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
        domain: 'itemshopp.eu.auth0.com',
        client_id: 'tZY36GUUdDOXIGU9mmCxuKJeUegCGJ4f',
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

  generate: {
    routes: dynamicRoutes
  }
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
