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


                  <li class="footer-navigation__sub-item"><a href="/pages/help" title="Help / FAQ">Help / FAQ</a></li>

                  <li class="footer-navigation__sub-item"><nuxt-link to="/legal/refund">Returns &amp; Exchanges</nuxt-link></li>

                  <li class="footer-navigation__sub-item"><a href="/pages/sizing" title="Sizing">Sizing</a></li>

                  <li class="footer-navigation__sub-item"><a href="/products/gift-card" title="Gift Cards">Gift Cards</a></li>

                  <li class="footer-navigation__sub-item"><a href="/pages/contact-us" title="Contact Us">Contact Us</a></li>

              </ul>

          </li>

          <li class="footer-navigation__item footer-navigation__item--about">


              <h2 class="footer-navigation__heading">About</h2>


              <ul class="footer-navigation__sub">

                  <li class="footer-navigation__sub-item"><a href="/blogs/journal/introducing-the-new-ugmonk" title="Our Story">Our Story</a></li>

                  <li class="footer-navigation__sub-item"><a href="/pages/shop" title="Shop">Shop</a></li>

                  <li class="footer-navigation__sub-item"><a href="/blogs/journal" title="Journal">Journal</a></li>

                  <li class="footer-navigation__sub-item"><a href="/pages/tee-story" title="About Our Tees">About Our Tees</a></li>

                  <li class="footer-navigation__sub-item"><a href="/pages/reviews" title="Reviews">Reviews</a></li>

              </ul>

          </li>

      </ul>
      <div class="footer-brand">
        <div class="footer-brand__text">
          <p>© Ugmonk 2020</p>
          <p>All images and content may not be used without permission</p>
        </div>
        <div class="footer-brand__logo">
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
.footer .hero {
  background: url(../../static/footer.jpg) no-repeat;
  background-size: cover;
  max-width: 100%;
}

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
