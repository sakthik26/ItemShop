<template>
<div>
 <h1 class='policy-title'> FAQ </h1>
<div class="policy-content">

<ol>
<li><strong><span> How long are shipping times?</span></strong></li>
</ol>
<p><span>Your products will ship within two days of your order, and then take up to two weeks to reach your doorstep. Each product at -->company has an estimated delivery time that you can find in the product description. </span></p>
<p><span> </span></p>
<ol start="2">
<li><strong><span> What's your return policy?</span></strong></li>
</ol>
<p><span>Instead of returning items, you can contact us for a full refund. Why? Returns run counter to our emphasis on sustainability: every return has a carbon footprint. So just tell us what went wrong, send along a pic, and we’ll give you your money back in full. Then, if possible, you can donate your product to a local charity or recycle it.</span></p>
<p><span> </span></p>
<ol start="3">
<li><strong><span> Can I cancel my order?</span></strong></li>
</ol>
<p><span>Cancelations are possible if you do not receive your package within the timeframe specified for each individual product. Sometimes orders get sent out before we can process the cancelation. So if you cancel your order but still receive the package, then please go ahead and do one of three things: recycle it, donate it, or enjoy it.</span></p>
<p><span> </span></p>
<ol start="4">
<li><strong><span> What happens if I receive the wrong item?</span></strong></li>
</ol>
<p><span>If there’s an issue with your order -- if it’s the wrong size, wrong color, defective, or otherwise not exactly what you wanted -- then simply notify us, and we’ll give you a refund. You won’t be asked to ship the product back to us.</span></p>
<p><span> </span></p>
<ol start="5">
<li><strong><span> Do you offer exchanges?</span></strong></li>
</ol>
<p><span>We do not offer exchanges. However, if for any reason you didn’t get the exact product you expected, just let us know and we’ll get you a new one.</span></p>

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
