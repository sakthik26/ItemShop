<template>
  <div class="callback">Sigining in...</div>
</template>

<script>
export default {
  name: "callback",
  mounted() {
    this.$store.commit("showProgressLoader", true);
    this.$store.commit("isUserLoggedIn", true);
    this.$router.push({ name: "" });
    setTimeout(function() {
      this.$store.commit("showProgressLoader", false);
    }, 1500);
  }
};
</script>
