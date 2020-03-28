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
              <!-- <button class="button is-small" :title="removeFromFavouriteLabel" v-show="product.isFavourite" @click="removeFromFavourite(product.id)">
                <span class="icon is-small">
                  <i class="fa fa-heart"></i>
                </span>
              </button>
              <button class="button is-small" :title="addToFavouriteLabel" v-show="!product.isFavourite" @click="saveToFavorite(product.id)">
                <span class="icon is-small">
                  <i class="fa fa-heart-o"></i>
                </span>
              </button> -->
            </h2>
          </div>
          <div class="card-content__variants">
          <!-- <v-radio-group v-model="radios" :mandatory="false">
            <v-radio label="Radio 11" value="radio-1"></v-radio>
            <v-radio label="Radio 2" value="radio-2"></v-radio>
          </v-radio-group> -->
          <div class="product-option-row product-option-row--swatches product-option-row--5 product-option-row--size" >
          <div class="swatch">
            <div class="swatch-element swatch-element--s">
              <input type="radio"  v-model="variant" name="single-option-select-1" id="swatch-1-s" value="S" data-index="option1" class="single-option-select visually-hidden">
              <label :class="variant==='S'? 'selected':''" for="swatch-1-s">S</label>
            </div>
            <div class="swatch-element swatch-element--m">
              <input type="radio" v-model="variant" name="single-option-select-1" id="swatch-1-m" value="M" data-index="option1" class="single-option-select visually-hidden">
              <label :class="variant==='M'? 'selected':''" for="swatch-1-m">M</label>
            </div>
            <div class="swatch-element swatch-element--l">
              <input type="radio" v-model="variant" name="single-option-select-1" id="swatch-1-l" value="L" data-index="option1" class="single-option-select visually-hidden">
              <label :class="variant==='L'? 'selected':''" for="swatch-1-l">L</label>
            </div>
            <div class="swatch-element swatch-element--xl selected-swatch">
              <input type="radio" v-model="variant" name="single-option-select-1" id="swatch-1-xl" value="XL" data-index="option1" class="single-option-select visually-hidden" checked="">
              <label  :class="variant==='XL'? 'selected':''" for="swatch-1-xl">XL</label>
            </div>
            <div class="swatch-element swatch-element--xxl swatch--unavailable">
              <input type="radio" v-model="variant" name="single-option-select-1" id="swatch-1-xxl" value="XXL" data-index="option1" class="single-option-select visually-hidden">
              <label :class="variant==='XXL'? 'selected':''" for="swatch-1-xxl">XXL</label>
            </div>
      </div>
    </div>
          </div>
          <div class="card-content__price">
            <span>&euro;{{ product.price }}</span>
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
          <!-- <div class="card-content__reviews">
            <div class="is-pulled-left">
              <p><strong>{{ product.reviews > 0 ? `${product.reviews} Reviews` : 'No reviews' }}</strong></p>
            </div>
            <div class="select is-rounded is-small is-pulled-right">
              <select @change="onSelectQuantity(product.id)" v-model="selected">
                <option v-for="quantity in quantityArray" :value="quantity">{{ quantity }}</option>
              </select>
            </div>
          </div> -->

          <div class="card-content__btn">
            <button class="button is-primary" v-if="!isAddedBtn" @click="addToCart(product.id)">{{ addToCartLabel }}</button>
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
      slides: [],
      variant: "S"
    };
  },

  mounted() {
    console.log("enter id");
    console.log(this.$route.params.id);
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

  watch: {
    variant: function(variant) {}
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
  max-width: 400px;
  min-width: 400px;
}
div.product-detail {
  justify-content: center;
  width: 70%;
  margin: 0 auto;
}

div.card-content__btn button {
  background-color: #1976d2 !important;
}

@media screen and (max-width: 850px) {
  div.product-detail {
    width: 80%;
    display: block;
  }
  div.product-image {
    margin: 0% 0% 5% 0%;
    max-width: 100%;
    min-width: 100%;
  }
  div.product-content {
    max-width: 100%;
    min-width: 100%;
  }
}
div.card-content__price {
  padding-bottom: 0.5rem;
  padding-top: 0.5rem;
  border-bottom: 1px solid #ddd;
  font-weight: normal !important;
}

div.card-content__btn button {
  width: 100%;
}
div.product-option-row--swatches {
  width: 100%;
  margin: 0;
  padding: 2rem 0 0 0;
}
div.product-option-row {
  margin-top: 10px;
  -webkit-box-flex: 0;
  -ms-flex: 0 0 100%;
  flex: 0 0 100%;
  margin: 0;
  padding: 0 0 2rem;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
}
div.swatch {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  width: 100%;
  line-height: 1;
  .swatch-element {
    display: inline-block;
    min-width: 50px;
    height: 50px;
    line-height: 50px;
    margin: 0 0.8rem 0.8rem 0;
    position: relative;
  }
  .visually-hidden {
    border: 0;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
    white-space: nowrap;
  }
  label {
    font-size: 12px;
    // font-family: "MaisonNeueMedium", "Avenir Next", "Helvetica Neue", Helvetica,
    //   Arial, sans-serif;
    font-style: normal;
    margin-bottom: 0.35em;
  }
  .swatch-element label,
  .swatch-element a {
    padding: 1rem 1.5rem;
    text-align: center;
    cursor: pointer;
    border: 1px solid #ddd;
    -webkit-transition: 0.2s ease-in border;
    -o-transition: 0.2s ease-in border;
    transition: 0.2s ease-in border;
  }
  .swatch-element label:hover {
    border-color: #1976d2;
  }
  .swatch-element label.selected:hover {
    border-color: none;
  }

  .swatch-element label.selected {
    background-color: #1976d2 !important;
    color: #fff;
  }
}
</style>

