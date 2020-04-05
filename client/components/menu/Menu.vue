<template>
	<div>
		<div class="navbar-item">
			<div class="">

					 <v-btn v-if="!isUserLoggedIn" depressed color="primary" @click="redirectToAuth0">{{ loginLabel }}
				   </v-btn>


			</div>

        <div>
					 <v-btn v-if="isUserLoggedIn"  text large color="primary"> My Account
				   </v-btn>

					 <v-btn v-if="isUserLoggedIn"  text large color="primary" v-on:click="logout"> Logout
				   </v-btn>
      </div>
      <div>
				 <v-btn  text large color="primary" v-on:click="openCheckoutDrawer">  <v-icon medium>shopping_cart</v-icon>
				   </v-btn>
      </div>

		</div>
    <Checkout v-if="showCheckoutDrawer" :drawer="showCheckoutDrawer"></Checkout>
    <div v-if="showCheckoutDrawer" class="outside" v-on:click="away()"></div>
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
	</div>
</template>

<script>
import Checkout from "../checkout/Checkout";
export default {
  name: "VmMenu",
  components: {
    Checkout
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
    }
  },

  methods: {
    away() {
      this.showCheckoutDrawer = false;
    },
    openCheckoutDrawer() {
      this.showCheckoutDrawer = true;
    },
    logout() {
      this.$store.commit("showProgressLoader", true);
      this.$auth.logout({
        returnTo: "http://localhost:3000"
      });
      window.location.href =
        "https://dev-owxl7c5w.eu.auth0.com/v2/logout?returnTo=http%3A%2F%2Flocalhost:3000&client_id=w1Cy4XsnNicTI5cptHgKeqNbiBKVWVmB";
      setTimeout(function() {
        this.$store.commit("isUserLoggedIn", false);
        this.$store.commit("showProgressLoader", false);
      }, 2000);
      // // this.$store.commit("isUserSignedUp", false);

      //Remove products from fav
    },
    redirectToAuth0() {
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


<style lang="scss" scoped>
div.navbar-item button.v-size--large {
  margin-top: 10%;
}
div.outside {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0px;
  left: 0px;
  background: rgba(120, 120, 120, 0.7);
}
</style>
