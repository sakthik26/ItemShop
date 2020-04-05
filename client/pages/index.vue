<template>
  <div>
    <VmHero></VmHero>
    <VmProductsList></VmProductsList>
  </div>
</template>

<script>
import VmProductsList from "@/components/products_list/ProductsListContainer";
import VmHero from "@/components/hero/Hero";

export default {
  name: "index",
  components: {
    VmProductsList,
    VmHero
  },
  mounted() {
    this.$shopify.product.fetchAll().then(products => {
      //If product no available set available tag to false
      var productsList = [];
      for (var i = 0; i < products.length; i++) {
        var product = {};
        product.id = products[i].id;
        product.title = products[i].title;
        product.availableForSale = products[i].availableForSale;
        product.description = products[i].description;
        product.variants = products[i].variants;
        product.image = products[i].images[0].src;
        product.price = products[i].variants[0].price;
        product.currency = products[i].variants[0].priceV2.currencyCode;
        product.quantity = 1;
        product.quantityExceeded = false;
        productsList.push(product);
      }
      console.log(productsList);
      this.$store.commit("populateProductsList", productsList);
      console.log(products);
    });
  }
};
</script>
