<template>
<div>
 <h1 class='policy-title'> Frequently Asked Questions </h1>
<div class="policy-content">

<div><strong>How long are shipping times?</strong><br />Your products will ship within two - five days of placing your order, and then take up to two - three weeks to reach your doorstep. Each product at ITEMSHOPP has an estimated delivery time that you can find in the product description.<br /> <br /><strong>What's your return policy?</strong><br />To be eligible for a return, your item must be in the same condition that you received it, unworn or unused, with tags, and in its original packaging. You’ll also need the receipt or proof of purchase. <br /><br />To start a return, you can contact us at <a href="mailto:itemshoppinfo@gmail.com">itemshoppinfo@gmail.com</a>. If your return is accepted, we’ll send you a return shipping label, as well as instructions on how and where to send your package. Items sent back to us without first requesting a return will not be accepted. </div>
<div><br /><strong>Can I cancel my order?</strong><br />Cancelations are possible if you do not receive your package within the timeframe specified.<br /><br /><strong>What happens if I receive the wrong item?</strong><br />If there’s an issue with your order -- if it’s the wrong size, wrong color, defective, or otherwise not exactly what you wanted -- then simply notify us, and we’ll give you a refund.<br /> <br /><strong>Do you offer exchanges?</strong><br />We do not offer exchanges. However, if for any reason you didn’t get the exact product you expected, just let us know and we’ll get you a new one.</div>
<div>
<div></div>
</div>
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

div.policy-content {
  min-height: 500px;
}
</style>
