<template>
	<div>
		<div class="navbar-item">
			<div class="field is-grouped">

					 <v-btn v-if="!isUserLoggedIn" depressed color="primary" @click="redirectToAuth0">{{ loginLabel }}
				   </v-btn>


					 <v-btn v-if="isUserLoggedIn"  text large color="primary"> My Account
				   </v-btn>

					 <v-btn v-if="isUserLoggedIn"  text large color="primary" v-on:click="logout"> Logout
				   </v-btn>

			</div>
		</div>
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
export default {
  name: "VmMenu",
  data() {
    return {
      wishlistLabel: "Wishlist",
      logoutLabel: "Log out",
      loginLabel: "Sign in"
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
</style>
