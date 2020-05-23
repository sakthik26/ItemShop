<template>
  <div>
    <VmHero></VmHero>
    <VmProductsList></VmProductsList>
   <!-- <ul class="users">
          <li v-for="user in test" :key="user.id">
            <nuxt-link :to="'/users/'+user.id">{{ user.name }}</nuxt-link>
          </li>
        </ul> -->
  </div>
</template>

<script>
import VmProductsList from "@/components/products_list/ProductsListContainer";
import VmHero from "@/components/hero/Hero";
import axios from "axios";

export default {
  name: "index",
  components: {
    VmProductsList,
    VmHero
  },
  data() {
    return {
      collectionName: "Fitness",
      test: [] // hardcoded at the moment
    };
  },
  mounted() {
    //fetch the user information
    if (this.$store.getters.isUserLoggedIn) {
      axios
        .get("https://hypezhop.eu.auth0.com/userinfo", {
          headers: {
            Authorization: localStorage.getItem("auth._token.auth0") + ""
          }
        })
        .then(response => {
          if (response && response.data)
            this.$store.commit("setEmail", response.data.email);
        })
        .catch(e => {
          console.log(e);
        });
    }
  },

  // this.$shopify.product.fetchAll().then(products => {
  //   //If product no available set available tag to false

  // });
  // async asyncData({ $shopify }) {
  //   var resp = await axios.get("https://jsonplaceholder.typicode.com/users");
  //   var resp = await $shopify.collection.fetchAllWithProducts();
  //   return { test: resp.data };
  // },

  async fetch({ store, $shopify }) {
    var collections = await $shopify.collection.fetchAllWithProducts();
    // Do something with the collections
    //Currently fetching only one collection

    var products = collections.filter(
      collection => collection.title == "Fitness"
    )[0].products;
    // console.log(JSON.stringify(products[0]));

    var productsList = [];
    for (var i = 0; i < products.length; i++) {
      var product = {};
      product.id = products[i].id;
      product.title = products[i].title;
      product.availableForSale = products[i].availableForSale;
      product.description = products[i].description;
      product.variants = products[i].variants;
      (product.tab =
        products[i].variants[0].selectedOptions[2] &&
        products[i].variants[0].selectedOptions[2].name == "Tab"
          ? products[i].variants[0].selectedOptions[2].value
          : null),
        (product.image = products[i].images[0].src);
      product.price = products[i].variants[0].price;
      product.currency = products[i].variants[0].priceV2.currencyCode;
      product.quantity = 1;
      product.quantityExceeded = false;
      productsList.push(product);
    }

    store.commit("populateProductsList", productsList);

    if (productsList.length > 0) {
      var tabSections = productsList.map(product => {
        return product.tab;
      });
      tabSections = Array.from(new Set(tabSections));
      var tabsWithId = [];
      for (var i = 0; i < tabSections.length; i++) {
        var obj = { id: i, title: tabSections[i] };
        tabsWithId.push(obj);
      }
      tabSections = tabsWithId;
      // tabSections.filter((product, index) => {
      //   return tabSections.inselectedTabdexOf(product) === index;
      // });
      store.commit("setTabContent", tabSections);
      if (store.getters.selectedTab)
        store.commit("setTabSelected", store.getters.selectedTab);
      else store.commit("setTabSelected", tabSections[0].id);
    }

    console.log("herer ###########$$$$$$$$$$");
    store.commit("resetProductReviews");
    var reviewAPI =
      "https://judge.me/api/v1/reviews?api_token=_B6uADabPFBI5y94UqWtVp6Xndg&shop_domain=derneuesitemshop.myshopify.com";
    //store the reviews in the state before rendering the product description

    const proxyurl = "https://cors-anywhere.herokuapp.com/";

    const url =
      "https://judge.me/api/v1/reviews?api_token=_B6uADabPFBI5y94UqWtVp6Xndg&shop_domain=derneuesitemshop.myshopify.com"; // site that doesn’t send Access-Control-*
    // fetch(proxyurl + reviewAPI+ "&page=" + 1) // https://cors-anywhere.herokuapp.com/https://example.com
    //   .then(response => response.json())
    //   .then(contents => console.log(contents))
    //   .catch(() =>
    //     console.log("Can’t access " + url + " response. Blocked by browser?")
    //   );
    // for (var i = 1; i <= 4; i++) {
    //   var response = await axios.get(proxyurl + reviewAPI + "&page=" + i, {
    //     headers: { "X-Requested-With": "http://localhost:3000/" }
    //   });

    //   // If request is good...
    //   // console.log("no error");
    //   // console.log(response.data.reviews);
    //   store.commit("populateProductReviews", response.data.reviews);
    //   console.log("reviews here" + response.data.reviews);
    // fetch(proxyurl + reviewAPI + "&page=" + i)
    //   .then(response => response.json())
    //   .then(response => {
    //     if (response.reviews.length > 0)
    //       this.$store.commit("populateProductReviews", response.reviews);
    //   });
    // var response =  fetch(proxyurl + reviewAPI + "&page=" + i, {
    //   method: "GET", // *GET, POST, PUT, DELETE, etc.
    //   headers: {
    //     "x-requested-with": "http://localhost:3000/"
    //   }
    // });
    // var data = await response.json();
    // if (response.reviews.length > 0)
    //   store.commit("populateProductReviews", response.reviews);
    // }

    console.log("herer ###########$$$$$$$$$$");
  }

  // async fetch({ app, params, store }) {
  //   var API_URL =
  //     "https://derneuesitemshop.myshopify.com/api/2020-01/graphql.json";

  //   var collections = await this.$shopify.collection.fetchAllWithProducts();
  //   var response = await axios.post(
  //     API_URL,
  //     {
  //       query: `fragment VariantFragment on ProductVariant  { id,title,price,priceV2 { amount,currencyCode },presentmentPrices (first: 20) { pageInfo { hasNextPage,hasPreviousPage },edges { node { price { amount,currencyCode },compareAtPrice { amount,currencyCode } } } },weight,available: availableForSale,sku,compareAtPrice,compareAtPriceV2 { amount,currencyCode },image { id,src: originalSrc,altText },selectedOptions { name,value },unitPrice { amount,currencyCode },unitPriceMeasurement { measuredType,quantityUnit,quantityValue,referenceUnit,referenceValue } },fragment CollectionFragment on Collection  { id,handle,description,descriptionHtml,updatedAt,title,image { id,src: originalSrc,altText } },fragment ProductFragment on Product  { id,availableForSale,createdAt,updatedAt,descriptionHtml,description,handle,productType,title,vendor,publishedAt,onlineStoreUrl,options { id,name,values },images (first: 250) { pageInfo { hasNextPage,hasPreviousPage },edges { cursor,node { id,src,altText } } },variants (first: 250) { pageInfo { hasNextPage,hasPreviousPage },edges { cursor,node { ...VariantFragment } } } },query ($first:Int!,$query:String,$sortKey:CollectionSortKeys,$reverse:Boolean,$productsFirst:Int!)  { collections (first: $first query: $query sortKey: $sortKey reverse: $reverse) { pageInfo { hasNextPage,hasPreviousPage },edges { cursor,node { ...CollectionFragment,products (first: $productsFirst) { pageInfo { hasNextPage,hasPreviousPage },edges { cursor,node { ...ProductFragment } } } } } } }`,
  //       variables: { first: 20, productsFirst: 20 }
  //     },
  //     {
  //       headers: {
  //         "Content-Type": "application/json",
  //         "x-shopify-storefront-access-token":
  //           "0243067c912abe3a8d853fdaec78203c"
  //       }
  //     }
  //   );
  //   // Do something with the collections
  //   //Currently fetching only one collection
  //   var products = collections.filter(
  //     collection => collection.title == this.collectionName
  //   )[0].products;
  //   console.log(response.data.data.collections.edges);
  //   var collections = response.data.data.collections.edges;
  //   console.log(collections);
  //   var products = collections[2].node.products.edges;
  //   console.log(products);
  // var products = chosenCollection[0].node.products.edges;
  //console.log(products);
  // var collections = await this.$shopify.collection.fetchAllWithProducts();
  // // Do something with the collections
  // //Currently fetching only one collection
  // var products = collections.filter(
  //   collection => collection.title == this.collectionName
  // )[0].products;
  // var productsList = [];
  // for (var i = 0; i < products.length; i++) {
  //   var product = {};
  //   product.id = products[i].id;
  //   product.title = products[i].title;
  //   product.availableForSale = products[i].availableForSale;
  //   product.description = products[i].description;
  //   product.variants = products[i].variants;
  //   (product.tab =
  //     products[i].variants[0].selectedOptions[2] &&
  //     products[i].variants[0].selectedOptions[2].name == "Tab"
  //       ? products[i].variants[0].selectedOptions[2].value
  //       : null),
  //     (product.image = products[i].images[0].src);
  //   product.price = products[i].variants[0].price;
  //   product.currency = products[i].variants[0].priceV2.currencyCode;
  //   product.quantity = 1;
  //   product.quantityExceeded = false;
  //   productsList.push(product);
  // }
  // console.log(productsList);
  // this.$store.commit("populateProductsList", productsList);
  // console.log(products);
  // if (productsList.length > 0) {
  //   var tabSections = productsList.map(product => {
  //     return product.tab;
  //   });
  //   tabSections = Array.from(new Set(tabSections));
  //   var tabsWithId = [];
  //   for (var i = 0; i < tabSections.length; i++) {
  //     var obj = { id: i, title: tabSections[i] };
  //     tabsWithId.push(obj);
  //   }
  //   tabSections = tabsWithId;
  //   // tabSections.filter((product, index) => {
  //   //   return tabSections.inselectedTabdexOf(product) === index;
  //   // });
  //   this.$store.commit("setTabContent", tabSections);
  //   if (this.$store.getters.selectedTab)
  //     this.$store.commit("setTabSelected", this.$store.getters.selectedTab);
  //   else this.$store.commit("setTabSelected", tabSections[0].id);
  // }
  // }
};
</script>
