<template>
<div>
 <!-- <VmSearch></VmSearch> -->

  <div class="card-container columns is-multiline" :class="isCheckoutDrawerOpen? 'disable': ''">
  <v-tabs >
    <v-tab>Best Sellers</v-tab>
    <v-tab>Men</v-tab>
    <v-tab>Women</v-tab>
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
    <div class="column is-one-quarter" v-for="product in products" :key="product.id">
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
  mounted() {},
  computed: {
    isCheckoutDrawerOpen() {
      return this.$store.getters.showCheckoutDrawer;
    },
    products() {
      if (this.$store.state.userInfo.hasSearched) {
        return this.getProductByTitle();
      } else {
        return this.$store.state.products;
      }
    }
  },

  methods: {
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
.card-container {
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
</style>
