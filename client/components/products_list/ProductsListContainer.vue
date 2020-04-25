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
       <v-select
          :items="items"
        ></v-select>
      </v-col>
      <!-- <div class="collection-header__sorting">
    <label for="sort-by-select" aria-label="Sort By">Sort By</label>
    <div class="form__field--select">
      <select id="sort-by-select">
        <option value="manual">Featured</option>
        <option value="price-ascending">Price: Low to High</option>
        <option value="price-descending">Price: High to Low</option>
        <option value="title-ascending">A-Z</option>
        <option value="title-descending">Z-A</option>
        <option value="created-ascending">Oldest to Newest</option>
        <option value="created-descending">Newest to Oldest</option>
        <option value="best-selling">Best Selling</option>
      </select>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 27 44"><path d="M27,22L27,22L5,44l-2.1-2.1L22.8,22L2.9,2.1L5,0L27,22L27,22z" fill="#000000"></path></svg>
    </div>
  </div> -->
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
      items: ["Foo", "Bar", "Fizz", "Buzz"]
    };
  },
  mounted() {
    //change the shopname and API token for the store for changing the reviews
    var reviewAPI =
      "https://judge.me/api/v1/reviews?api_token=_B6uADabPFBI5y94UqWtVp6Xndg&shop_domain=derneuesitemshop.myshopify.com";
    //store the reviews in the state before rendering the product description
    for (var i = 1; i <= 10; i++)
      axios(reviewAPI + "&page=" + 1, {
        method: "GET",
        mode: "no-cors",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"
        },
        credentials: "same-origin"
      })
        .then(response => {
          if (response.reviews.length > 0)
            this.$store.commit("populateProductReviews", response.reviews);
        })
        .catch(e => {
          this.$store.commit("populateProductReviews", [
            {
              id: 102095375,
              title: null,
              body: "They came perfect. Seem good quality. Still not tested.",
              rating: 5,
              product_external_id: 4714294542475,
              reviewer: {
                id: 194034339,
                external_id: null,
                email: "ali_review_10013730959845251+import83_AbCs@example.com",
                name: "Breana Schneider",
                phone: null,
                accepts_marketing: true,
                unsubscribed_at: null,
                source_email: "ali_review_10013730959845251@example.com",
                tags: null
              },
              source: "aliexpress",
              curated: "not-yet",
              hidden: false,
              verified: "nothing",
              featured: false,
              created_at: "2020-02-23T14:35:00+00:00",
              updated_at: "2020-04-18T22:41:30+00:00",
              pictures: [
                {
                  urls: {
                    small:
                      "https://ae01.alicdn.com/kf/U951b897cc4cd447c96c9af86edba64ebE.jpg",
                    compact:
                      "https://ae01.alicdn.com/kf/U951b897cc4cd447c96c9af86edba64ebE.jpg",
                    huge:
                      "https://ae01.alicdn.com/kf/U951b897cc4cd447c96c9af86edba64ebE.jpg",
                    original:
                      "https://ae01.alicdn.com/kf/U951b897cc4cd447c96c9af86edba64ebE.jpg"
                  },
                  hidden: false
                },
                {
                  urls: {
                    small:
                      "https://ae01.alicdn.com/kf/U52f8b23c68aa495ca1c10c87fb10f33cQ.jpg",
                    compact:
                      "https://ae01.alicdn.com/kf/U52f8b23c68aa495ca1c10c87fb10f33cQ.jpg",
                    huge:
                      "https://ae01.alicdn.com/kf/U52f8b23c68aa495ca1c10c87fb10f33cQ.jpg",
                    original:
                      "https://ae01.alicdn.com/kf/U52f8b23c68aa495ca1c10c87fb10f33cQ.jpg"
                  },
                  hidden: false
                },
                {
                  urls: {
                    small:
                      "https://ae01.alicdn.com/kf/Uf000101872194e04a470e296da3a8e6aM.jpg",
                    compact:
                      "https://ae01.alicdn.com/kf/Uf000101872194e04a470e296da3a8e6aM.jpg",
                    huge:
                      "https://ae01.alicdn.com/kf/Uf000101872194e04a470e296da3a8e6aM.jpg",
                    original:
                      "https://ae01.alicdn.com/kf/Uf000101872194e04a470e296da3a8e6aM.jpg"
                  },
                  hidden: false
                }
              ],
              ip_address: null,
              product_title:
                "New design mixed color bamboo toothbrush Eco Friendly wooden Tooth Brush Soft bristle Tip Charcoal adults oral care toothbrush",
              product_handle:
                "new-design-mixed-color-bamboo-toothbrush-eco-friendly-wooden-tooth-brush-soft-bristle-tip-charcoal-adults-oral-care-toothbrush"
            },
            {
              id: 102095376,
              title: null,
              body:
                "Brushes with soft bristles. Environmentally friendly, which I really liked. Bristles are bright, there is no smell.",
              rating: 5,
              product_external_id: 4714294542475,
              reviewer: {
                id: 194034341,
                external_id: null,
                email: "ali_review_20008230610270043+import74_lYMO@example.com",
                name: "Frances Kuphal",
                phone: null,
                accepts_marketing: true,
                unsubscribed_at: null,
                source_email: "ali_review_20008230610270043@example.com",
                tags: null
              },
              source: "aliexpress",
              curated: "not-yet",
              hidden: false,
              verified: "nothing",
              featured: false,
              created_at: "2020-02-21T19:02:00+00:00",
              updated_at: "2020-04-18T22:41:31+00:00",
              pictures: [
                {
                  urls: {
                    small:
                      "https://ae01.alicdn.com/kf/U379469ace91e4ae7aaa4f5f32d5d72b1T.jpg",
                    compact:
                      "https://ae01.alicdn.com/kf/U379469ace91e4ae7aaa4f5f32d5d72b1T.jpg",
                    huge:
                      "https://ae01.alicdn.com/kf/U379469ace91e4ae7aaa4f5f32d5d72b1T.jpg",
                    original:
                      "https://ae01.alicdn.com/kf/U379469ace91e4ae7aaa4f5f32d5d72b1T.jpg"
                  },
                  hidden: false
                },
                {
                  urls: {
                    small:
                      "https://ae01.alicdn.com/kf/Ub1cdc21f1de640048ded03e15fa7b9b4v.jpg",
                    compact:
                      "https://ae01.alicdn.com/kf/Ub1cdc21f1de640048ded03e15fa7b9b4v.jpg",
                    huge:
                      "https://ae01.alicdn.com/kf/Ub1cdc21f1de640048ded03e15fa7b9b4v.jpg",
                    original:
                      "https://ae01.alicdn.com/kf/Ub1cdc21f1de640048ded03e15fa7b9b4v.jpg"
                  },
                  hidden: false
                },
                {
                  urls: {
                    small:
                      "https://ae01.alicdn.com/kf/U4bce4bee68324bbd98301743dca4b55dZ.jpg",
                    compact:
                      "https://ae01.alicdn.com/kf/U4bce4bee68324bbd98301743dca4b55dZ.jpg",
                    huge:
                      "https://ae01.alicdn.com/kf/U4bce4bee68324bbd98301743dca4b55dZ.jpg",
                    original:
                      "https://ae01.alicdn.com/kf/U4bce4bee68324bbd98301743dca4b55dZ.jpg"
                  },
                  hidden: false
                }
              ],
              ip_address: null,
              product_title:
                "New design mixed color bamboo toothbrush Eco Friendly wooden Tooth Brush Soft bristle Tip Charcoal adults oral care toothbrush",
              product_handle:
                "new-design-mixed-color-bamboo-toothbrush-eco-friendly-wooden-tooth-brush-soft-bristle-tip-charcoal-adults-oral-care-toothbrush"
            },
            {
              id: 101943476,
              title: null,
              body:
                "Product as the announcement came perfect condition. Arrived in perfect condition…",
              rating: 5,
              product_external_id: 4673712259211,
              reviewer: {
                id: 193733880,
                external_id: null,
                email: "ali_review_10012670536564646+import20_shKn@example.com",
                name: "Corene Moen",
                phone: null,
                accepts_marketing: true,
                unsubscribed_at: null,
                source_email: "ali_review_10012670536564646@example.com",
                tags: null
              },
              source: "aliexpress",
              curated: "not-yet",
              hidden: false,
              verified: "nothing",
              featured: false,
              created_at: "2020-02-13T05:42:00+00:00",
              updated_at: "2020-04-18T11:55:21+00:00",
              pictures: [
                {
                  urls: {
                    small:
                      "https://ae01.alicdn.com/kf/U662bf5fe12c743ba832908ea8b649d64N.jpg",
                    compact:
                      "https://ae01.alicdn.com/kf/U662bf5fe12c743ba832908ea8b649d64N.jpg",
                    huge:
                      "https://ae01.alicdn.com/kf/U662bf5fe12c743ba832908ea8b649d64N.jpg",
                    original:
                      "https://ae01.alicdn.com/kf/U662bf5fe12c743ba832908ea8b649d64N.jpg"
                  },
                  hidden: false
                },
                {
                  urls: {
                    small:
                      "https://ae01.alicdn.com/kf/U47dcde7565d94ee09cb696554b9d38044.jpg",
                    compact:
                      "https://ae01.alicdn.com/kf/U47dcde7565d94ee09cb696554b9d38044.jpg",
                    huge:
                      "https://ae01.alicdn.com/kf/U47dcde7565d94ee09cb696554b9d38044.jpg",
                    original:
                      "https://ae01.alicdn.com/kf/U47dcde7565d94ee09cb696554b9d38044.jpg"
                  },
                  hidden: false
                },
                {
                  urls: {
                    small:
                      "https://ae01.alicdn.com/kf/Ubf99905d469c4225bfcb1a0d287488edr.jpg",
                    compact:
                      "https://ae01.alicdn.com/kf/Ubf99905d469c4225bfcb1a0d287488edr.jpg",
                    huge:
                      "https://ae01.alicdn.com/kf/Ubf99905d469c4225bfcb1a0d287488edr.jpg",
                    original:
                      "https://ae01.alicdn.com/kf/Ubf99905d469c4225bfcb1a0d287488edr.jpg"
                  },
                  hidden: false
                }
              ],
              ip_address: null,
              product_title:
                "Mens Joggers Casual Pants Fitness Men Sportswear - Blue",
              product_handle:
                "mens-joggers-casual-pants-fitness-men-sportswear-tracksuit-bottoms-skinny-sweatpants-trousers-black-gyms-jogger-track-pants"
            }
          ]);
        });

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
  },
  computed: {
    isCheckoutDrawerOpen() {
      return this.$store.getters.showCheckoutDrawer;
    },
    products() {
      return this.$store.state.products.filter(product => {
        return (
          product.tab ===
          this.$store.getters.tabs[this.$store.getters.selectedTab].title
        );
      });
    },
    tabs() {
      return this.$store.getters.tabs;
    },
    selectedTab() {
      return this.$store.getters.selectedTab;
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
  // display: flex;
  // /* justify-content: center; */
  // flex-direction: row;
  // /* width: 70%; */
  // /* justify-content: space-around; */
  // margin: 0 auto;
  // flex-wrap: wrap;

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
