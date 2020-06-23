<template>
  <div class="callback"><div class="text-center" style="
position: fixed;
     width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0px;
  left: 0px;
  background: rgba(120, 120, 120, 0.7);

">
    <v-progress-circular
      :size="50"
      color="primary"
      indeterminate
    ></v-progress-circular>
    </div></div>
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
<style>
div.callback {
  min-height: 900px;
  margin-top: 10%;
}
</style>


