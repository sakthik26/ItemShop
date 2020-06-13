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
  // async mounted() {
  //   if (this.$store.getters.isUserLoggedIn) {
  //     axios
  //       .get("https://hypezhop.eu.auth0.com/userinfo", {
  //         headers: {
  //           Authorization: localStorage.getItem("auth._token.auth0") + ""
  //         }
  //       })
  //       .then(response => {
  //         if (response && response.data)
  //           this.$store.commit("setEmail", response.data.email);
  //       })
  //       .catch(e => {
  //         console.log(e);
  //       });
  //   }
  //   await this.$shopify.collection.fetchAllWithProducts().then(collections => {
  //     // Do something with the collections
  //     //Currently fetching only one collection
  //     var products = collections.filter(
  //       collection => collection.title == this.collectionName
  //     )[0].products;
  //     var productsList = [];
  //     for (var i = 0; i < products.length; i++) {
  //       var product = {};
  //       product.id = products[i].id;
  //       product.title = products[i].title;
  //       product.availableForSale = products[i].availableForSale;
  //       product.description = products[i].description;
  //       product.variants = products[i].variants;
  //       (product.tab =
  //         products[i].variants[0].selectedOptions[2] &&
  //         products[i].variants[0].selectedOptions[2].name == "Tab"
  //           ? products[i].variants[0].selectedOptions[2].value
  //           : null),
  //         (product.image = products[i].images[0].src);
  //       product.price = products[i].variants[0].price;
  //       product.currency = products[i].variants[0].priceV2.currencyCode;
  //       product.quantity = 1;
  //       product.quantityExceeded = false;
  //       productsList.push(product);
  //     }
  //     console.log(productsList);
  //     this.$store.commit("populateProductsList", productsList);
  //     console.log(products);
  //     if (productsList.length > 0) {
  //       var tabSections = productsList.map(product => {
  //         return product.tab;
  //       });
  //       tabSections = Array.from(new Set(tabSections));
  //       var tabsWithId = [];
  //       for (var i = 0; i < tabSections.length; i++) {
  //         var obj = { id: i, title: tabSections[i] };
  //         tabsWithId.push(obj);
  //       }
  //       tabSections = tabsWithId;
  //       // tabSections.filter((product, index) => {
  //       //   return tabSections.inselectedTabdexOf(product) === index;
  //       // });
  //       this.$store.commit("setTabContent", tabSections);
  //       if (this.$store.getters.selectedTab)
  //         this.$store.commit("setTabSelected", this.$store.getters.selectedTab);
  //       else this.$store.commit("setTabSelected", tabSections[0].id);
  //     }
  //   });
  // }

  async fetch({ store, $shopify }) {
    const collectionId = "Z2lkOi8vc2hvcGlmeS9Db2xsZWN0aW9uLzE1OTU4MjA5MzM4Mg==";
    var collection = await $shopify.collection.fetchWithProducts(collectionId, {
      productsFirst: 40
    });
    console.log(collection);
    // Do something with the collections
    //Currently fetching only one collection
    // var collection = collections.filter(collection => collection.title == "Fitness");
    // console.log(test);
    var products = collection.products;
    // console.log(JSON.stringify(products[0]));

    var productsList = [];
    console.log("Products length -" + products.length);
    for (var i = 0; i < products.length; i++) {
      if (products[i].availableForSale) {
        var product = {};
        product.id = products[i].id;
        product.title = products[i].title;
        product.availableForSale = products[i].availableForSale;
        product.description = products[i].descriptionHtml;
        product.variants = products[i].variants;
        (product.tab =
          products[i].variants[0].selectedOptions[1] &&
          products[i].variants[0].selectedOptions[1].name == "Tab"
            ? products[i].variants[0].selectedOptions[1].value
            : null),
          (product.image = products[i].images[0].src);
        product.price = products[i].variants[0].price;
        product.currency = products[i].variants[0].priceV2.currencyCode;
        product.quantity = 1;
        product.quantityExceeded = false;
        console.log("actual state here" + store.state);
        console.log("average review here " + store.state.averageReview);
        product.averageReview = store.state.averageReview;
        productsList.push(product);
      }
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
  }
};
</script>
