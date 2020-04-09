<template>
  <div class="callback">Sigining in...</div>
</template>

<script>
export default {
  name: "callback",
  mounted() {
    this.$store.commit("showProgressLoader", true);
    this.$store.commit("isUserLoggedIn", true);

    console.log("helloitsme" + this.$store.getters.cartItems.redirectToPath);
    this.$router.push({
      path: "" + this.$store.getters.cartItems.redirectToPath
    });
    setTimeout(function() {
      this.$store.commit("showProgressLoader", false);
    }, 1500);
  }
};
</script>
