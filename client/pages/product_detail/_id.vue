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
          <div class="card-content__price">
            <span>&euro;{{ product.price }}</span>
          </div>
          <div class="card-content__variants" v-if="availableVariants.length>0">
           <div class="product-option-row product-option-row--swatches product-option-row--5 product-option-row--size" >
           <div class="swatch">
            <div v-for = "variant in variantsOrder" v-bind:key="variant">
              <div class="swatch-element" v-if="availableVariants.indexOf(variant) >=0">
              <input type="radio"  v-model="selectedVariant" name="single-option-select-1" v-bind:id="variant" :value="variant" class="single-option-select visually-hidden">
              <label :class="selectedVariant=== variant ? 'selected':''" :for="variant">{{variant}}</label>
              </div>
              <div class="swatch-element  swatch--unavailable" v-else>
                 <input type="radio"  v-model="selectedVariant" name="single-option-select-1" v-bind:id="variant" :value="variant" class="single-option-select visually-hidden" disabled>
              <label :class="selectedVariant=== variant ? 'selected':''" :for="variant">{{variant}}</label>
              </div>
            </div>
            </div>
          </div>
          </div>
          <div class="card-content__btn">
            <button class="button is-primary" v-if="!isAddedBtn" @click="addToCart(selectedVariant)"> + {{ addToCartLabel }}</button>
          </div>

          <div class="card-content__description">
            <p>
            Product description here
            </p>
          </div>
           <div class="card-content__other-details">
          <!-- <img :src="product.image"> -->
           <Tabs></Tabs>
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
import Tabs from "@/components/tabs/Tabs";
import Vue from "vue";
export default {
  name: "product_detail-id",
  components: {
    Checkout,
    Carousel,
    Tabs
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
      selectedVariant: "",
      variantsOrder: ["S", "M", "L", "XL", "XXL"],
      variantIdMap: {},
      availableVariants: []
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

      for (let i = 0; i < this.product.variants.length; i++) {
        if (
          this.product.variants[i].selectedOptions[0] &&
          this.product.variants[i].selectedOptions[0].name == "Size"
        ) {
          this.availableVariants.push(
            this.product.variants[i].selectedOptions[0].value
          );
          this.variantIdMap[
            this.product.variants[i].selectedOptions[0].value
          ] = {
            id: this.product.variants[i].id,
            image: this.product.variants[i].image.src,
            price: this.product.variants[i].priceV2.amount,
            cumulativePrice: this.product.variants[i].priceV2.amount,
            currency: this.product.variants[i].priceV2.currencyCode,
            available: this.product.variants[i].available,
            size: this.product.variants[i].selectedOptions[0].value,
            title: this.product.title,
            quantity: 1
          };
          for (var j = 0; j < this.variantsOrder.length; j++) {
            if (this.availableVariants.indexOf(this.variantsOrder[j]) >= 0) {
              this.selectedVariant = this.variantsOrder[j];
              break;
            }
          }
        } else {
          this.variantIdMap["all"] = {
            id: this.product.variants[i].id,
            image: this.product.variants[i].image.src,
            cumulativePrice: this.product.variants[i].priceV2.amount,
            price: this.product.variants[i].priceV2.amount,
            currency: this.product.variants[i].priceV2.currencyCode,
            available: this.product.variants[i].available,
            title: this.product.title,
            quantity: 1
          };
          this.selectedVariant = "all";
        }
      }

      console.log(this.product);
      console.log(this.availableVariants);
      this.loading = false;
    });
  },

  watch: {
    selectedVariant: function(variant) {
      //console.log(this.variantIdMap[variant]);
      //this.$store.commit("cartItem", this.variantIdMap[variant]);
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
    addToCart(selectedVariant) {
      this.showCheckoutDrawer = true;
      var productInformation = this.variantIdMap[selectedVariant];
      this.$store.commit("addToCart", productInformation);
      // this.$store.commit("setAddedBtn", data);
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
  background: rgba(120, 120, 120, 0.7);
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
div.card-content__title {
  font-weight: 400;
}
div.card-content__btn button {
  background-color: #1976d2 !important;
}
div.card-content__btn button,
div.card-content__variants {
  margin-top: 20px;
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
  font-weight: 300;
  font-size: 16px;
}
div.card-content__description {
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
  .swatch--unavailable label:hover {
    border: 1px solid #ddd;
  }
  .swatch--unavailable label {
    color: #aeaeae;
    border-color: #aeaeae;
    position: relative;
    background: -webkit-gradient(
      linear,
      right bottom,
      left top,
      color-stop(49%, transparent),
      color-stop(49.5%, currentColor),
      color-stop(50.5%, currentColor),
      color-stop(51%, transparent)
    );
    background: -webkit-linear-gradient(
      right bottom,
      transparent 49%,
      currentColor 49.5%,
      currentColor 50.5%,
      transparent 51%
    );
    background: -o-linear-gradient(
      right bottom,
      transparent 49%,
      currentColor 49.5%,
      currentColor 50.5%,
      transparent 51%
    );
    background: linear-gradient(
      to left top,
      transparent 49%,
      currentColor 49.5%,
      currentColor 50.5%,
      transparent 51%
    );
  }
}

div.card-content__other-details {
  margin-top: 10px;
}
</style>

