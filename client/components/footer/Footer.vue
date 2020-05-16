<template>
  <div class="footer">
     <!-- <div class="hero is-medium is-bold">
    <div class="hero-body">
      <div class="container">
        <h1 class="title">
        </h1>
        <h2 class="subtitle">
        </h2>
      </div>
    </div>
  </div> -->
  <div class="footer-section footer-section--lower">
    <div class="container">
      <ul class="footer-navigation">


          <li class="footer-navigation__item footer-navigation__item--customer-service">


              <h2 class="footer-navigation__heading">Customer Service</h2>


              <ul class="footer-navigation__sub">


                  <li class="footer-navigation__sub-item"><nuxt-link to="/legal/faq">FAQ</nuxt-link></li>

                  <li class="footer-navigation__sub-item"><nuxt-link to="/legal/refund">Returns &amp; Exchanges</nuxt-link></li>

                  <li class="footer-navigation__sub-item"><nuxt-link to="/legal/privacy">Privacy</nuxt-link><li>

                  <li class="footer-navigation__sub-item"><nuxt-link to="/legal/terms">Terms of Service</nuxt-link></li>

                    <li class="footer-navigation__sub-item"><nuxt-link to="/legal/shipping">Shipping Policy</nuxt-link></li>

              </ul>

          </li>

          <li class="footer-navigation__item footer-navigation__item--about">
              <h2 class="footer-navigation__heading">About</h2>
              <ul class="footer-navigation__sub">
                     <li class="footer-navigation__sub-item"><a href="/legal/about">About Us</a></li>
                      <li class="footer-navigation__sub-item"><a href="/legal/about">Contact</a></li>
              </ul>

          </li>

      </ul>
      <div class="footer-brand">
        <div class="footer-brand__text">
          <p>© 2020 ItemShopp</p>
          <p>All images and content may not be used without permission</p>
        </div>
        <div class="footer-brand__logo">
                  </div>
                  <div class="payment_methods">


            <img src="//cdn.shopify.com/s/assets/payment_icons/american_express-2264c9b8b57b23b0b0831827e90cd7bcda2836adc42a912ebedf545dead35b20.svg" alt="American express">

            <img src="//cdn.shopify.com/s/assets/payment_icons/apple_pay-f6db0077dc7c325b436ecbdcf254239100b35b70b1663bc7523d7c424901fa09.svg" alt="Apple pay">

            <img src="//cdn.shopify.com/s/assets/payment_icons/master-173035bc8124581983d4efa50cf8626e8553c2b311353fbf67485f9c1a2b88d1.svg" alt="Master">

            <img src="//cdn.shopify.com/s/assets/payment_icons/visa-319d545c6fd255c9aad5eeaad21fd6f7f7b4fdbdb1a35ce83b89cca12a187f00.svg" alt="Visa">

        </div>

      </div>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  name: "VmFooter"
};
</script>

<style lang="scss" scoped>
.footer {
  background: #fff;
  color: black;
  padding: 0px;
}
@media screen and (min-width: 1264px) {
  .container {
    max-width: 1185px;
  }
}

// .footer .hero {
//   background: url(../../static/footer.jpg) no-repeat;
//   background-size: cover;
//   max-width: 100%;
// }

// @media screen and (min-width: 1200px) {
//   .footer .hero {
//     height: 400px;
//   }
// }

// @media screen and (min-width: 500px) and (max-width: 1199px) {
//   .footer .hero {
//     height: 300px;
//   }
// }

// @media screen and (min-width: 300px) and (max-width: 500px) {
//   .footer .hero {
//     height: 200px;
//   }

.footer li.footer-navigation__item {
  margin-right: 10%;
}

.footer .container {
  display: flex;
  justify-content: space-between;

  ul.footer-navigation {
    display: flex;
    flex-basis: 50%;
  }
}
</style>
