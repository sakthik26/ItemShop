<template>
<div>
 <!-- <VmSearch></VmSearch> -->
  <div class="card-container columns is-multiline" :class="isCheckoutDrawerOpen? 'disable': ''">

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
import { getByTitle } from "@/assets/filters";
import VmSearch from "../search/Search";
export default {
  name: "productsList",

  components: { VmProducts, VmSearch },

  data() {
    return {
      // id: "",
      noProductLabel: "No product found",
      productsFiltered: []
    };
  },

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
}
.card-container.disable {
  pointer-events: none;
}
</style>
