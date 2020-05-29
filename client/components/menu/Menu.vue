<template>
		<div class="navbar-item">
			<div class="  ">

					 <v-btn v-if="!isUserLoggedIn" depressed color="primary" @click="redirectToAuth0">{{ loginLabel }}
				   </v-btn>


			</div>

        <div>
					 <v-btn v-if="isUserLoggedIn"  text large color="primary" v-on:click="openDialog"> Account
				   </v-btn>

					 <v-btn v-if="isUserLoggedIn"  text large color="primary" v-on:click="logout"> Logout
				   </v-btn>
      </div>
      <div :class="cartItems ? 'show-dot': 'hide-dot'">
         <v-badge
        overlap
        dot
        color="primary"

      >
       <v-btn  text large color="primary" v-on:click="openCheckoutDrawer">  <v-icon medium>shopping_cart</v-icon>
				   </v-btn>
      </v-badge>

      </div>
      <UserProfile/>
		</div>
    <!-- <Checkout  :drawer="showCheckoutDrawer"></Checkout>
    <div v-if="showCheckoutDrawer" class="outside" v-on:click="away()"></div> -->
		<!-- <div v-if="isUserLoggedIn" class="navbar-item has-dropdown is-hoverable">
			<a class="navbar-link">
			Welcome {{ getUserName }}
			</a>
			<div class="navbar-dropdown is-boxed">
				<nuxt-link class="navbar-item" :to="{ name: 'user-wishlist' }">
					{{ wishlistLabel }}
				</nuxt-link>
				<hr class="navbar-divider">
				<a class="navbar-item" @click="logout">
					{{ logoutLabel }}
				</a>
			</div>
		</div> -->

</template>

<script>
import Checkout from "../checkout/Checkout";
import UserProfile from "../user/UserProfile";
export default {
  name: "VmMenu",
  components: {
    Checkout,
    UserProfile
  },
  data() {
    return {
      wishlistLabel: "Wishlist",
      logoutLabel: "Log out",
      loginLabel: "Sign in",
      showCheckoutDrawer: false
    };
  },

  mounted() {},

  computed: {
    isUserLoggedIn() {
      return this.$store.getters.isUserLoggedIn;
    },
    getUserName() {
      let name = this.$store.getters.getUserName;

      if (name === "") {
        return "user";
      } else {
        return name;
      }
    },

    cartItems() {
      let cartItems = this.$store.getters.cartItems;
      if (cartItems.items.length > 0) return true;
      else return false;
    }
  },

  methods: {
    openDialog() {
      this.$store.commit("changeAccountDialogState", true);
    },
    away() {
      this.showCheckoutDrawer = false;
      /// this.$store.commit("closeCheckoutDrawer");
    },
    openCheckoutDrawer() {
      this.$store.commit("openCheckoutDrawer");
      // this.$store.commit("openCheckoutDrawer");
    },
    logout() {
      this.$store.commit("showProgressLoader", true);
      this.$auth.logout({
        returnTo: "http://localhost:3000"
      });
      window.location.href =
        "https://hypezhop.eu.auth0.com/v2/logout?returnTo=http%3A%2F%2Flocalhost:3000&client_id=jOpZ4JozQIu2Gwv4Nbtn97aFBF0UV2ap";
      setTimeout(function() {
        this.$store.commit("isUserLoggedIn", false);
        this.$store.commit("showProgressLoader", false);
      }, 2000);
      // // this.$store.commit("isUserSignedUp", false);

      //Remove products from fav
    },
    redirectToAuth0() {
      console.log("current" + $nuxt.$route.path);
      this.$store.commit("redirectToPath", $nuxt.$route.path);
      this.$auth.loginWith("auth0");
      this.$store.commit("showProgressLoader", true);

      // this.$store.commit("isUserLoggedIn", this.isFormSuccess);
    },
    // logout() {
    //   this.$store.commit("isUserLoggedIn", false);
    //   this.$store.commit("isUserSignedUp", false);
    //   this.$store.commit("removeProductsFromFavourite");

    //   // redirect to homepage
    //   this.$router.push({ name: "index" });
    // },
    showLoginModal() {
      this.$store.commit("showLoginModal", true);
    },
    showSignupModal() {
      this.$store.commit("showSignupModal", true);
    }
  }
};
</script>


<style>
div.navbar-item button.v-size--large {
  margin-top: 10%;
}
.outside {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0px;
  left: 0px;
  background: rgba(120, 120, 120, 0.7);
}

div.show-dot span.v-badge__badge.primary {
  left: 50px !important;

  /* top: 12px !important; */
  top: 10px !important;
}
div.hide-dot span.v-badge__badge.primary {
    display: none;
}
</style>
