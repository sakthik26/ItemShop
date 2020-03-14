<template>
  <div class="callback">Sigining in...</div>
</template>

<script>
export default {
  name: "callback",
  mounted() {
    this.$store.commit("isUserLoggedIn", true);
    this.$router.push({ path: "/" });
  }
};
</script>
