<template>
<div>
 <!-- <VmSearch></VmSearch> -->

  <div class="product-list card-container columns is-multiline" :class="isCheckoutDrawerOpen? 'disable': ''">
  <v-tabs v-model="selectedTab">
    <v-tab v-for="tab in tabs" :key="tab.id"
    @click="onTabClick(tab.id)"> {{tab.title}}</v-tab>
   </v-tabs>
   <v-col>
     <div class="select-label"> Sort By</div>
       <v-select v-model="filterVal"
          :items="items"
        ></v-select>
      </v-col>
    <div class="column product-card" v-for="product in products" :key="product.id">
      <VmProducts :product="product"></VmProducts>
    </div>
    <div class="section" v-if="products.length === 0">
      <p>{{ noProductLabel }}</p>
    </div>
  </div>
  </div>
</template>

<script>
import VmProducts from "../Products";
import axios from "axios";
import { getByTitle } from "@/assets/filters";
import VmSearch from "../search/Search";
export default {
  name: "productsList",

  components: { VmProducts, VmSearch },

  data() {
    return {
      // id: "",
      noProductLabel: "No product found",
      productsFiltered: [],
      items: ["Featured", "Price: Low to High", "Price: High to Low"],
      selectedFilter: "Featured"
    };
  },

  // async fetch({ store }) {
  //   //change the shopname and API token for the store for changing the reviews
  //   store.commit("resetProductReviews");
  //   var reviewAPI =
  //     "https://judge.me/api/v1/reviews?api_token=_B6uADabPFBI5y94UqWtVp6Xndg&shop_domain=derneuesitemshop.myshopify.com";
  //   //store the reviews in the state before rendering the product description

  //   const proxyurl = "https://cors-anywhere.herokuapp.com/";

  //   const url =
  //     "https://judge.me/api/v1/reviews?api_token=_B6uADabPFBI5y94UqWtVp6Xndg&shop_domain=derneuesitemshop.myshopify.com"; // site that doesn’t send Access-Control-*
  //   // fetch(proxyurl + reviewAPI+ "&page=" + 1) // https://cors-anywhere.herokuapp.com/https://example.com
  //   //   .then(response => response.json())
  //   //   .then(contents => console.log(contents))
  //   //   .catch(() =>
  //   //     console.log("Can’t access " + url + " response. Blocked by browser?")
  //   //   );
  //   for (var i = 1; i <= 10; i++)
  //     fetch(proxyurl + reviewAPI + "&page=" + i)
  //       .then(response => response.json())
  //       .then(response => {
  //         if (response.reviews.length > 0)
  //           store.commit("populateProductReviews", response.reviews);
  //       })
  //       .catch(e => {
  // this.$store.commit("populateProductReviews", [
  //   {
  //     id: 101943476,
  //     title: null,
  //     body:
  //       "Product as the announcement came perfect condition. Arrived in perfect condition…",
  //     rating: 1,
  //     product_external_id: 4673712259211,
  //     reviewer: {
  //       id: 193733880,
  //       external_id: null,
  //       email: "ali_review_10012670536564646+import20_shKn@example.com",
  //       name: "Corene Moen",
  //       phone: null,
  //       accepts_marketing: true,
  //       unsubscribed_at: null,
  //       source_email: "ali_review_10012670536564646@example.com",
  //       tags: null
  //     },
  //     source: "aliexpress",
  //     curated: "not-yet",
  //     hidden: false,
  //     verified: "nothing",
  //     featured: false,
  //     created_at: "2020-02-13T05:42:00+00:00",
  //     updated_at: "2020-04-18T11:55:21+00:00",
  //     pictures: [
  //       {
  //         urls: {
  //           small:
  //             "https://ae01.alicdn.com/kf/U662bf5fe12c743ba832908ea8b649d64N.jpg",
  //           compact:
  //             "https://ae01.alicdn.com/kf/U662bf5fe12c743ba832908ea8b649d64N.jpg",
  //           huge:
  //             "https://ae01.alicdn.com/kf/U662bf5fe12c743ba832908ea8b649d64N.jpg",
  //           original:
  //             "https://ae01.alicdn.com/kf/U662bf5fe12c743ba832908ea8b649d64N.jpg"
  //         },
  //         hidden: false
  //       },
  //       {
  //         urls: {
  //           small:
  //             "https://ae01.alicdn.com/kf/U47dcde7565d94ee09cb696554b9d38044.jpg",
  //           compact:
  //             "https://ae01.alicdn.com/kf/U47dcde7565d94ee09cb696554b9d38044.jpg",
  //           huge:
  //             "https://ae01.alicdn.com/kf/U47dcde7565d94ee09cb696554b9d38044.jpg",
  //           original:
  //             "https://ae01.alicdn.com/kf/U47dcde7565d94ee09cb696554b9d38044.jpg"
  //         },
  //         hidden: false
  //       },
  //       {
  //         urls: {
  //           small:
  //             "https://ae01.alicdn.com/kf/Ubf99905d469c4225bfcb1a0d287488edr.jpg",
  //           compact:
  //             "https://ae01.alicdn.com/kf/Ubf99905d469c4225bfcb1a0d287488edr.jpg",
  //           huge:
  //             "https://ae01.alicdn.com/kf/Ubf99905d469c4225bfcb1a0d287488edr.jpg",
  //           original:
  //             "https://ae01.alicdn.com/kf/Ubf99905d469c4225bfcb1a0d287488edr.jpg"
  //         },
  //         hidden: false
  //       }
  //     ],
  //     ip_address: null,
  //     product_title:
  //       "Mens Joggers Casual Pants Fitness Men Sportswear - Blue",
  //     product_handle:
  //       "mens-joggers-casual-pants-fitness-men-sportswear-tracksuit-bottoms-skinny-sweatpants-trousers-black-gyms-jogger-track-pants"
  //   },
  //   {
  //     id: 102794687,
  //     title: null,
  //     body:
  //       "The goods are cool... as in the photo .. the size XL came up perfectly .. on the height of 174 weight 86 delivery fast .. I advise this product .. and shop ..!!!",
  //     rating: 2,
  //     product_external_id: 4814757527691,
  //     reviewer: {
  //       id: 195627705,
  //       external_id: null,
  //       email: "ali_review_20006222241150268+import25_iX6g@example.com",
  //       name: "Iacopo Martinelli",
  //       phone: null,
  //       accepts_marketing: true,
  //       unsubscribed_at: null,
  //       source_email: "ali_review_20006222241150268@example.com",
  //       tags: null
  //     },
  //     source: "aliexpress",
  //     curated: "not-yet",
  //     hidden: false,
  //     verified: "nothing",
  //     featured: false,
  //     created_at: "2020-01-27T11:47:00+00:00",
  //     updated_at: "2020-04-21T22:25:58+00:00",
  //     pictures: [
  //       {
  //         urls: {
  //           small:
  //             "https://ae01.alicdn.com/kf/Ub5daa9244055461fbce2f1b786eac2aby.jpg",
  //           compact:
  //             "https://ae01.alicdn.com/kf/Ub5daa9244055461fbce2f1b786eac2aby.jpg",
  //           huge:
  //             "https://ae01.alicdn.com/kf/Ub5daa9244055461fbce2f1b786eac2aby.jpg",
  //           original:
  //             "https://ae01.alicdn.com/kf/Ub5daa9244055461fbce2f1b786eac2aby.jpg"
  //         },
  //         hidden: false
  //       },
  //       {
  //         urls: {
  //           small:
  //             "https://ae01.alicdn.com/kf/U3548a26e639d4f07b93d8ca38b63533e3.jpg",
  //           compact:
  //             "https://ae01.alicdn.com/kf/U3548a26e639d4f07b93d8ca38b63533e3.jpg",
  //           huge:
  //             "https://ae01.alicdn.com/kf/U3548a26e639d4f07b93d8ca38b63533e3.jpg",
  //           original:
  //             "https://ae01.alicdn.com/kf/U3548a26e639d4f07b93d8ca38b63533e3.jpg"
  //         },
  //         hidden: false
  //       },
  //       {
  //         urls: {
  //           small:
  //             "https://ae01.alicdn.com/kf/Uf20138f332394caa960bc2207d516b276.jpg",
  //           compact:
  //             "https://ae01.alicdn.com/kf/Uf20138f332394caa960bc2207d516b276.jpg",
  //           huge:
  //             "https://ae01.alicdn.com/kf/Uf20138f332394caa960bc2207d516b276.jpg",
  //           original:
  //             "https://ae01.alicdn.com/kf/Uf20138f332394caa960bc2207d516b276.jpg"
  //         },
  //         hidden: false
  //       }
  //     ],
  //     ip_address: null,
  //     product_title:
  //       "Mens Joggers Casual Pants Fitness Men Sportswear - Blue",
  //     product_handle:
  //       "mens-joggers-casual-pants-fitness-men-sportswear-blue"
  //   }
  // ]);
  //     });

  // fetch(reviewAPI + "&page=" + 1)
  //   .then(function(response) {
  //     if (response.status !== 200) {
  //       console.log(
  //         "Looks like there was a problem. Status Code: " + response.status
  //       );
  //       return;
  //     }

  //     // Examine the text in the response
  //     response.json().then(function(data) {
  //       console.log(data);
  //     });
  //   })
  //   .catch(function(err) {
  //     console.log("Fetch Error :-S", err);
  //   });
  //},
  computed: {
    isCheckoutDrawerOpen() {
      return this.$store.getters.showCheckoutDrawer;
    },
    products() {
      // var products = this.$store.state.products.filter(product => {
      //   return (
      //     product.tab ===
      //     this.$store.getters.tabs[this.$store.getters.selectedTab].title
      //   );
      // });
      var products = this.$store.state.products;
      if (this.$store.getters.filterVal === "Price: Low to High")
        return products.sort(function(p1, p2) {
          return p1.price - p2.price;
        });
      else if (this.$store.getters.filterVal === "Price: High to Low")
        return products.sort(function(p1, p2) {
          return p2.price - p1.price;
        });
      else return products;
    },
    tabs() {
      return this.$store.getters.tabs;
    },
    selectedTab() {
      return this.$store.getters.selectedTab;
    },
    filterVal: {
      get() {
        return this.$store.getters.filterVal;
      },
      set(newFilterVal) {
        this.$store.commit("setFilterValue", newFilterVal);
      }
    }
  },
  methods: {
    onTabClick(tabId) {
      this.$store.commit("setTabSelected", tabId);
    },
    getProductByTitle() {
      let listOfProducts = this.$store.state.products,
        titleSearched = this.$store.state.userInfo.productTitleSearched;

      return (this.productsFiltered = getByTitle(
        listOfProducts,
        titleSearched
      ));
    }
  }
};
</script>

<style lang="scss" scoped>
.product-list.card-container {
  width: 75%;
  margin: 0 auto;
  position: relative;

  .v-tabs {
    flex: 1 1 80%;
  }

  .col {
    flex: 1 1 20%;
  }

  .col .select-label {
    font-size: 0.875rem;
  }
  .col .v-select__slot .v-select__selections {
    font-size: 0.875rem !important;
  }
}

@media screen and (max-width: 700px) {
  .card-container .v-slide-group__prev {
    display: none !important;
  }
}
.card-container.disable {
  pointer-events: none;
}

@media screen and (min-width: 1200px) {
  .column.product-card {
    -webkit-box-flex: 0;
    -ms-flex: none;
    flex: none;
    width: 33.3%;
  }
}

@media screen and (min-width: 769px) and (max-width: 1159px) {
  .column.product-card {
    -webkit-box-flex: 0;
    -ms-flex: none;
    flex: none;
    width: 50%;
  }
}
</style>
