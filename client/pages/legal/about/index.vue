<template>
<div>
 <h1 class='policy-title'> About Us </h1>
<div class="policy-content">

<p>Welcome to [SHOP NAME]!</p>
<p><span>We aim to offer our customers a variety of the latest [PRODUCTS CATEGORY NAME]. We’ve come a long way, so we know exactly which direction to take when supplying you with high quality yet budget-friendly products. We offer all of this while providing excellent customer service and friendly support.</span></p>
<p><span>We always keep an eye on the latest trends in [PRODUCTS CATEGORY NAME] and put our customers’ wishes first. That is why we have satisfied customers all over the world, and are thrilled to be a part of the [PRODUCTS CATEGORY NAME] industry.</span></p>
<p><span>The interests of our customers are always top priority for us, so we hope you will enjoy our products as much as we enjoy making them available to you.</span></p>
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
