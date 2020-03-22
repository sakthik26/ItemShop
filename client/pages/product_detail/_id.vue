<template>
  <div class="section">
    <div v-if="!loading" class="card is-clearfix columns">
        <figure class="card-image is-480x480 column is-one-thirds">
          <img :src="product.image">
        </figure>
        <div class="card-content column is-two-thirds">
          <div class="card-content__title">
            <h2 class="title is-4">{{ product.title }}
              <button class="button is-small" :title="removeFromFavouriteLabel" v-show="product.isFavourite" @click="removeFromFavourite(product.id)">
                <span class="icon is-small">
                  <i class="fa fa-heart"></i>
                </span>
              </button>
              <button class="button is-small" :title="addToFavouriteLabel" v-show="!product.isFavourite" @click="saveToFavorite(product.id)">
                <span class="icon is-small">
                  <i class="fa fa-heart-o"></i>
                </span>
              </button>
            </h2>
          </div>
          <div class="card-content__text">
            <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud
            </p>
          </div>
          <div class="card-content__ratings" v-if="product.rating === 1">
            <i class="fa fa-star"></i>
          </div>
          <div class="card-content__ratings" v-else-if="product.rating === 2">
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
          </div>
          <div class="card-content__ratings" v-else-if="product.rating === 3">
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
          </div>
          <div class="card-content__ratings" v-else-if="product.rating === 4">
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
          </div>
          <div class="card-content__ratings" v-else-if="product.rating === 5">
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
          </div>
          <div class="card-content__reviews">
            <div class="is-pulled-left">
              <p><strong>{{ product.reviews > 0 ? `${product.reviews} Reviews` : 'No reviews' }}</strong></p>
            </div>
            <div class="select is-rounded is-small is-pulled-right">
              <select @change="onSelectQuantity(product.id)" v-model="selected">
                <option v-for="quantity in quantityArray" :value="quantity">{{ quantity }}</option>
              </select>
            </div>
          </div>
          <div class="card-content__price is-pulled-left">
            <span class="title is-3"><strong>{{ product.price }}&euro;</strong></span>
          </div>
          <div class="card-content__btn is-pulled-right">
            <button class="button is-primary" v-if="!isAddedBtn" @click="addToCart(product.id)">{{ addToCartLabel }}</button>
            <button class="button is-text" v-if="isAddedBtn" @click="removeFromCart(product.id)">{{ removeFromCartLabel }}</button>
          </div>
      </div>
    </div>
    <Checkout :drawer="showCheckoutDrawer"></Checkout>
    <div v-if="showCheckoutDrawer" class="outside" v-on:click="away()"></div>
  </div>
</template>

<script>
import Checkout from "@/components/checkout/Checkout";
export default {
  name: "product_detail-id",
  components: {
    Checkout
  },

  // validate({ params }) {
  //   return /^\d+$/.test(params.id);
  // },3

  data() {
    return {
      showCheckoutDrawer: false,
      addToCartLabel: "Add to cart",
      removeFromCartLabel: "Remove from cart",
      addToFavouriteLabel: "Add to favourite",
      removeFromFavouriteLabel: "Remove from favourite",
      product: {},
      loading: true,
      selected: 1,
      quantityArray: []
    };
  },

  mounted() {
    console.log("enter id");
    //this.product = this.$store.getters.getProductById(this.$route.params.id);
    // this.selected = this.product.quantity;
    this.loading = true;
    this.$shopify.product.fetch(this.$route.params.id).then(products => {
      console.log(this.product);
      // Do something with the product

      this.product.title = products.title;
      this.product.availableForSale = products.availableForSale;
      this.product.description = products.description;
      this.product.variants = products.variants;
      this.product.image = products.images[0].src;
      this.product.price = products.variants[0].price;
      this.product.currency = products.variants[0].priceV2.currencyCode;
      this.product.quantity = 1;
      console.log(this.product);
      this.loading = false;
    });
    for (let i = 1; i <= 20; i++) {
      this.quantityArray.push(i);
    }
  },

  computed: {
    isAddedBtn() {
      return this.product.isAddedBtn;
    }
  },

  methods: {
    away() {
      this.showCheckoutDrawer = false;
    },
    addToCart(id) {
      this.showCheckoutDrawer = true;
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
    onSelectQuantity(id) {
      let data = {
        id: id,
        quantity: this.selected
      };
      this.$store.commit("quantity", data);
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
    }
  }
};
</script>

<style lang="scss" scoped>
.card-content {
  padding: 15px 10px 15px 0;

  &__text {
    margin: 15px 0;
  }
  &__reviews {
    display: inline-block;
    width: 100%;
    margin-bottom: 10px;
  }
}
div.outside {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0px;
  left: 0px;
}
</style>

