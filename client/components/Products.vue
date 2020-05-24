<template>
<a :href="/product_detail/" + product.id>
  <v-card
  height="650"
    class="mx-auto my-12"
    :class="isCheckoutDrawerOpen? 'disable':''"
    max-width="374"
      :hover=true
  >
    <v-img
      height= "440"
      :src="product.image"
    ></v-img>

    <v-card-title height= "90">{{ product.title }}</v-card-title>

    <v-card-text height= "40">
      <v-row
        align="center"
        class="mx-0"
      >
        <v-rating
          :value="4.5"
          color="amber"
          dense
          half-increments
          readonly
          size="14"
        ></v-rating>

        <div class="grey--text ml-4">4.5 (413)</div>
      </v-row>



      <!-- <div>{{ product.description }}</div> -->
      <div class="my-4 subtitle-1">
        <strong>&euro; {{ product.price }}</strong>
      </div>
    </v-card-text>


    <!-- currently commenting out because the size cannot be preselected
       <v-card-actions>
      <v-btn
        color="primary"
        text

      >
        Buy Now
      </v-btn>
      <v-btn
        color="primary"
        text

      >
        Add to Cart
      </v-btn>
    </v-card-actions> -->

  </v-card>
  </a>
</template>

<script>
export default {
  name: "products",
  props: ["product"],

  data() {
    return {
      addToCartLabel: "Add to cart",
      viewDetailsLabel: "Details",
      removeFromCartLabel: "Remove from cart",
      addToFavouriteLabel: "Add to favourite",
      removeFromFavouriteLabel: "Remove from favourite",
      selected: 1,
      quantityArray: []
    };
  },

  mounted() {
    for (let i = 1; i <= 20; i++) {
      this.quantityArray.push(i);
    }

    if (this.$props.product.quantity > 1) {
      this.selected = this.$props.product.quantity;
    }
  },

  computed: {
    isUserLogged() {
      return this.$store.getters.isUserLoggedIn;
    },
    isCheckoutDrawerOpen() {
      return this.$store.getters.showCheckoutDrawer;
    }
  },

  methods: {
    addToCart(id) {
      let data = {
        id: id,
        status: true
      };
      this.$store.commit("addToCart", id);
      this.$store.commit("setAddedBtn", data);
    },
    removeFromCart(id) {
      let data = {
        id: id,
        status: false
      };
      this.$store.commit("removeFromCart", id);
      this.$store.commit("setAddedBtn", data);
    },
    saveToFavorite(id) {
      let isUserLogged = this.$store.state.userInfo.isLoggedIn;

      if (isUserLogged) {
        this.$store.commit("addToFavourite", id);
      } else {
        this.$store.commit("showLoginModal", true);
      }
    },
    removeFromFavourite(id) {
      this.$store.commit("removeFromFavourite", id);
    },
    onSelectQuantity(id) {
      let data = {
        id: id,
        quantity: this.selected
      };
      this.$store.commit("quantity", data);
    }
  }
};
</script>

<style lang="scss" scoped>
.details {
  cursor: pointer;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;

  &:hover {
    border: 1px solid #51bafc;
  }
}
.button,
.select {
  z-index: 2;
}
.select {
  position: absolute;
  right: 15px;
  bottom: 35px;
}
.card-content {
  padding: 0;
}
.buttons {
  margin: 0;
}

.v-card {
  cursor: pointer;
}

.v-card.disable {
  background: rgba(120, 120, 120, 0.7) !important;
}
// div.v-card.v-sheet:hover {
//   box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
// }
.product-list .v-card__title {
  height: 90px;
}

.product-list .v-card__text {
  height: 70px;
}
</style>


