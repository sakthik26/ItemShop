<template>
  <div class="section">
    <div v-if="!loading" class="product-detail columns">
        <div class="product-image">
          <!-- <img :src="product.image"> -->
          <Carousel v-bind:slides="slides"></Carousel>
        </div>
        <div class="product-content">
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
           <!-- <button class="button is-primary" @click="checkout(product.id)">Test Checkout</button> -->
      </div>
    </div>
    <Checkout :drawer="showCheckoutDrawer"></Checkout>
    <div v-if="showCheckoutDrawer" class="outside" v-on:click="away()"></div>
  </div>
</template>

<script>
import Checkout from "@/components/checkout/Checkout";
import Carousel from "@/components/carousel/Carousel";
import Vue from "vue";
import VueAgile from "vue-agile";
export default {
  name: "product_detail-id",
  components: {
    Checkout,
    Carousel,
    agile: VueAgile
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
      quantityArray: [],
      slides: []
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

      for (var i = 0; i < products.images.length; i++) {
        this.slides.push(products.images[i].src);
      }
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
    checkout() {
      this.$shopify.checkout.create().then(checkout => {
        // Do something with the checkout
        console.log(checkout.id);
        var checkoutId = checkout.id;
        const lineItemsToAdd = [
          {
            variantId:
              "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8zMjkxMjk1NDI2MTY0Mw==",
            quantity: 4,
            customAttributes: [{ key: "MyKey", value: "MyValue" }]
          }
        ];
        this.$shopify.checkout
          .addLineItems(checkoutId, lineItemsToAdd)
          .then(checkout => {
            // Do something with the updated checkout
            console.log(checkout.lineItems);
            // const checkoutId =
            //   "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0SW1hZ2UvMTgyMTc3ODc1OTI="; // ID of an existing checkout

            const shippingAddress = {
              address1: "Chestnut Street 92",
              address2: "Apartment 2",
              city: "Louisville",
              company: null,
              country: "United States",
              firstName: "Bob",
              lastName: "Norman",
              phone: "555-625-1199",
              province: "Kentucky",
              zip: "40202"
            };

            // Update the shipping address for an existing checkout.
            this.$shopify.checkout
              .updateShippingAddress(checkout.id, shippingAddress)
              .then(checkout => {
                console.log(checkout.lineItems);
                // Do something with the updated checkout
              }); // Array with one additional line item
          });
      });
    },
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
div.product-image {
  margin: 0% 10% 0% 10%;
  max-width: 400px;
  min-width: 400px;
}
div.product-content {
}
div.product-detail {
  justify-content: center;
  width: 70%;
  margin: 0 auto;
}

@media screen and (max-width: 850px) {
  div.product-detail {
    width: 80%;
    display: block;
  }
  div.product-image {
    margin: 0% 0% 5% 0%;
  }
}
</style>

