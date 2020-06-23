<template>
<div>
 <h1 class='policy-title'> Shipping </h1>
<div class="policy-content">

<div><span>We work with suppliers around the world to source high-quality products. Our suppliers typically ship items within one to five days of receiving an order. From that point it takes 10-20 days for the items to arrive. </span></div>
<br />
<div><span>As soon as your product ships, you'll receive a tracking number that will let you keep tabs of where your order is at all times.</span></div>
  </div>
  </div>
</template>

<script>
export default {
  name: "refund"
  // mounted() {
  //   this.$store.commit("showProgressLoader", true);
  //   this.$store.commit("isUserLoggedIn", true);

  //   this.$router.push({ name: "" });
  //   setTimeout(function() {
  //     this.$store.commit("showProgressLoader", false);
  //   }, 1500);
  // }
};
</script>

<style>
div.policy-content {
  width: 75%;
  position: relative;
  margin: 5% auto;
}

h1.policy-title {
  text-align: center;
  font-weight: bold;
  margin-bottom: 20px;
  font-size: 30px;
}
</style>
