<template>
  <div>
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <nuxt-link :to="{ name: 'index' }" class="navbar-item">
          <h1 class="title is-3 is-flex-mobile"></h1>
        </nuxt-link>

        <a role="button" class="navbar-burger burger" @click="isMenuOpen = !isMenuOpen" aria-label="menu" aria-expanded="false">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <!-- <button class="test" aria-label="close" @click="auth0">Autho</button> -->
      <div class="navbar-menu is-active">
        <div class="navbar-start">
          <div class="navbar-item field">

          </div>
        </div>

        <div class="navbar-end">
          <!-- <div class="navbar-item social">
            <a href="#" class="icon" :title="facebookTooltip">
              <i class="fa fa-facebook"></i>
            </a>
            <a href="#" class="icon" :title="twitterTooltip">
              <i class="fa fa-twitter"></i>
            </a>
            <a href="#" class="icon" :title="instagramTooltip">
              <i class="fa fa-instagram"></i>
            </a>
            <a href="#" class="icon" :title="linkedinTooltip">
              <i class="fa fa-linkedin"></i>
            </a>
          </div> -->
          <!-- <div class="navbar-item shopping-cart" @click="showCheckoutModal">
            <span class="icon">
              <i class="fa fa-shopping-cart"></i>
            </span>
            <span :class="[numProductsAdded > 0 ? 'tag is-info' : '']">{{ numProductsAdded }}</span>
          </div> -->
        </div>
      </div>

      <!-- For mobile and tablet -->
      <div v-show="isMenuOpen" class="navbar-end">
        <VmMenu></VmMenu>
      </div>

      <!-- For desktop -->
      <div class="navbar-end is-hidden-mobile">
        <VmMenu></VmMenu>
      </div>
      <v-progress-linear v-if="showProgressLoader"
        :active="showProgressLoader"
        :indeterminate="showProgressLoader"
        absolute
        bottom
        color="deep-purple accent-4"
      ></v-progress-linear>

    </nav>

  </div>
</template>

<script>
import VmMenu from "../menu/Menu";
import VmSearch from "../search/Search";

export default {
  name: "VmHeader",

  data() {
    return {
      loading: true,
      user: "",
      linkedinTooltip: "Follow us on Linkedin",
      facebookTooltip: "Follow us on Facebook",
      twitterTooltip: "Follow us on Twitter",
      instagramTooltip: "Follow us on Instagram",
      isCheckoutActive: false,
      isMenuOpen: false
    };
  },

  mounted() {
    //  console.log(this.$auth);
    if (this.$auth.loggedIn) {
      this.$store.commit("isUserLoggedIn", true);
    }
  },
  components: {
    VmSearch,
    VmMenu
  },

  computed: {
    numProductsAdded() {
      return this.$store.getters.productsAdded.length;
    },
    showProgressLoader() {
      return this.$store.getters.showProgressLoader;
    }
  },

  methods: {
    showCheckoutModal() {
      this.$store.commit("showCheckoutModal", true);
    }
  }
};
</script>

<style lang="scss" scoped>
.title {
  background: url("../../static/is_logo.png") no-repeat;
  background-position: 0% 42%;
  background-size: 165px;
  width: 175px;
  height: 35px;
}
.shopping-cart {
  cursor: pointer;
}
a {
  color: grey;
}
div.navbar-end {
  align-items: center;
}
div .navbar {
  z-index: 0;
}

@media screen and (min-width: 300px) and (max-width: 1050px) {
  div.navbar-menu {
    display: none;
  }

  div.navbar-end {
    .navbar-item {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
