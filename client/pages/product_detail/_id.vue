<template>
  <div class="section">
    <div class="product-detail columns">
        <div class="product-image">
          <!-- <img :src="product.image"> -->
          <Carousel v-bind:slides="slides"></Carousel>
        </div>
        <div class="product-content">
          <div class="card-content__title">
            <h2 class="title is-4">{{ product.title }}

            </h2>
            <v-rating
          :value="averageReview"
          color="amber"
          dense
          half-increments
          readonly
          size="14"
        ></v-rating>
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
            --- Description ---
            </p>
          </div>
           <div class="card-content__other-details">
          <!-- <img :src="product.image"> -->
           <Tabs v-bind:src="sizingImage" :description="description"></Tabs>
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


    <div class="chart" v-if="averageReview">
      <div class ="review-title"> <h1>Customer Reviews</h1> </div>
       <div class="rating-star">
       <div class="stamped-summary-text-1" style="display: block;font-size: 38px;line-height: 30px;font-weight: bold;margin-right: 5px;">{{averageReview}} </div>
        <v-rating
          :value="averageReview"
          color="amber"
          dense
          half-increments
          readonly
          large
        ></v-rating>
       </div>


     <div style="width:200px;float:left;text-align: center;" class="summary-overview">


   <span class="stamped-starrating stamped-summary-starrating" aria-hidden="true"> <i class="stamped-fa stamped-fa-star" aria-hidden="true"></i><i class="stamped-fa stamped-fa-star" aria-hidden="true"></i><i class="stamped-fa stamped-fa-star" aria-hidden="true"></i><i class="stamped-fa stamped-fa-star" aria-hidden="true"></i><i class="stamped-fa stamped-fa-star" aria-hidden="true"></i> </span>
   <span class="stamped-summary-caption stamped-summary-caption-2">
   <span class="stamped-summary-text" data-count="2" data-rating="5">Based on {{reviewProps.length}} Reviews</span>
</span>
</div>
<div class="customer-reviews">

    <Reviews v-for="review in reviewsShown" :reviewProps="review"> </Reviews>

     <v-pagination
      v-model="page"
      :length="reviewPageCount"
      @input="onPageChange"
    ></v-pagination>
    </div>
</div>


  </div>
</template>

<script>
import Checkout from "@/components/checkout/Checkout";
import Carousel from "@/components/carousel/Carousel";
import Tabs from "@/components/tabs/Tabs";
import Reviews from "@/components/reviews/Reviews";
import Vue from "vue";
import { paleturquoise } from "color-name";

export default {
  name: "product_detail-id",
  components: {
    Checkout,
    Carousel,
    Tabs,
    Reviews
  },

  // validate({ params }) {
  //   return /^\d+$/.test(params.id);
  // },3

  data() {
    return {
      // reviewProps: {
      //   rating: 4,
      //   name: "sakthi",
      //   date: "2020-02-13T02:51:00+00:00",
      //   body: "this is test"
      // },
      page: 1,
      reviewProps: [],
      reviewsShown: [],
      averageReview: 0,
      reviewCountPerPage: 6,
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
      sizingImage: "",
      selectedVariant: "",
      description: "",
      variantsOrder: ["S", "M", "L", "XL", "XXL"],
      variantIdMap: {},
      availableVariants: []
    };
  },

  async asyncData({ params, error, payload, store }) {
    if (payload) {
      // console.log("reviews here " + payload.reviews);
      var reviews = payload.reviews;
      var products = payload.response;
      console.log("payload here " + JSON.stringify(products.variants.edges));
      // console.log('payload here'+payload)

      // console.log("enter id");
      // console.log(this.$route.params.id);
      //this.product = this.$store.getters.getProductById(this.$route.params.id);
      // this.selected = this.product.quantity;

      // $shopify.product.fetch(this.$route.params.id).then(products => {
      // console.log(this.product);
      // Do something with the product
      // store.commit("populateProductData", payload);
      var product = {};
      var slides = [];
      var availableVariants = [];
      var variantIdMap = {};
      var variantsOrder = ["S", "M", "L", "XL", "XXL"];
      var selectedVariant = "";
      product.title = products.title;
      product.availableForSale = products.availableForSale;
      product.description = products.descriptionHtml;
      product.variants = products.variants;
      product.image = products.images.edges[0].node.src;
      product.price = products.variants.edges[0].node.price;
      product.currency = products.variants.edges[0].node.priceV2.currencyCode;
      product.quantity = 1;
      console.log(product);
      for (var i = 0; i < products.images.edges.length; i++) {
        slides.push(products.images.edges[i].node.src);
      }

      for (let i = 0; i < products.variants.edges.length; i++) {
        if (
          products.variants.edges[i].node.selectedOptions[0] &&
          products.variants.edges[i].node.selectedOptions[0].name == "Size"
        ) {
          availableVariants.push(
            products.variants.edges[i].node.selectedOptions[0].value
          );
          variantIdMap[
            products.variants.edges[i].node.selectedOptions[0].value
          ] = {
            id: products.variants.edges[i].node.id,
            image: products.variants.edges[i].node.image.src,
            price: products.variants.edges[i].node.priceV2.amount,
            cumulativePrice: products.variants.edges[i].node.priceV2.amount,
            currency: products.variants.edges[i].node.priceV2.currencyCode,
            available: products.variants.edges[i].node.available,
            size: products.variants.edges[i].node.selectedOptions[0].value,
            title: products.title,
            quantity: 1,
            quantityExceeded: false
          };
          for (var j = 0; j < variantsOrder.length; j++) {
            if (availableVariants.indexOf(variantsOrder[j]) >= 0) {
              selectedVariant = variantsOrder[j];
              break;
            }
          }
        } else {
          variantIdMap["all"] = {
            id: products.variants.edges[i].node.id,
            image: products.variants.edges[i].node.image.src,
            cumulativePrice: products.variants.edges[i].node.priceV2.amount,
            price: products.variants.edges[i].node.priceV2.amount,
            currency: products.variants.edges[i].node.priceV2.currencyCode,
            available: products.variants.edges[i].node.available,
            title: products.title,
            quantity: 1,
            quantityExceeded: false
          };
          selectedVariant = "all";
        }
      }

      //Review handling here
      var actualReviews = [];
      for (var i = 0; i < reviews.length; i++)
        actualReviews = actualReviews.concat(reviews[i]);
      var productReviews = actualReviews.filter(review => {
        return review.product_title == product.title;
      });
      console.log("productReviews" + productReviews);
      var reviewCollection = [];
      for (var i = 0; i < productReviews.length; i++) {
        reviewCollection.push({
          body: productReviews[i].body,
          rating: productReviews[i].rating,
          date: productReviews[i].created_at,
          name: productReviews[i].reviewer.name,
          images: productReviews[i].pictures.map(reviewImages => {
            return reviewImages.urls.original;
          })
        });
      }
      console.log("reviewCollection" + reviewCollection);
      var reviewProps = [];
      var reviewsShown = [];
      var reviewCountPerPage = 6;
      reviewProps = reviewCollection;
      reviewsShown = reviewProps.slice(0, reviewCountPerPage);

      //average review
      var reviewRating = reviewProps.map(review => review.rating);
      // for (var i = 0; i < reviewRating.length; i++) {
      //   ++this.series[0].data[reviewRating[i] - 1];
      // }
      if (reviewRating.length > 0) {
        var averageReview =
          reviewRating.reduce((a, b) => a + b, 0) / reviewProps.length;

        // store.commit("setAverageReview", averageReview);
        // console.log(store.state);
      }
      return {
        selectedVariant: selectedVariant,
        product: product,
        slides: slides,
        sizingImage: selectedVariant === "all" ? "" : slides[slides.length - 1],
        availableVariants: availableVariants,
        description: product.description,
        variantIdMap: variantIdMap,
        reviewsShown: reviewsShown,
        reviewProps: reviewProps,
        averageReview: averageReview
      };
    }
  },
  watch: {
    // product: function() {
    //console.log(this.variantIdMap[variant]);
    //this.$store.commit("cartItem", this.variantIdMap[variant]);
    // }
  },

  mounted() {
    // if (localStorage.getItem("reloaded")) {
    //   // The page was just reloaded. Clear the value from local storage
    //   // so that it will reload the next time this page is visited.
    //   localStorage.removeItem("reloaded");
    // } else {
    //   // Set a flag so that we know not to reload the page twice.
    //   localStorage.setItem("reloaded", "1");
    //   location.reload();
    // }
  },

  computed: {
    isAddedBtn() {
      return this.product.isAddedBtn;
    },
    reviewPageCount() {
      return this.reviewProps && this.reviewProps.length > 0
        ? Math.ceil(this.reviewProps.length / this.reviewCountPerPage)
        : 0;
    }
  },

  methods: {
    onPageChange() {
      this.reviewsShown = this.reviewProps.slice(
        (this.page - 1) * this.reviewCountPerPage,
        this.reviewCountPerPage * this.page
      );
    },
    away() {
      this.showCheckoutDrawer = false;
    },
    addToCart(selectedVariant) {
      //this.showCheckoutDrawer = true;
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
.section {
  margin-bottom: 10%;
}

div.review-title {
  margin: 0 auto;
  /* width: 100%; */
  text-align: center;
}

div.customer-reviews {
  display: flex;
  justify-content: center;
  /* width: 70%; */
  margin: 0 auto;
  width: 70%;
  flex-wrap: wrap;
}
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

div.product-image {
  margin: 0% 10% 0% 10%;
  max-width: 400px;
  min-width: 400px;
}
div.product-content {
  max-width: 400px;
  min-width: 400px;
  button {
    position: static;
  }
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
    position: static;
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

div.review-title h1 {
  font-size: 1.55rem !important;
  font-weight: 500;
  letter-spacing: 0.0125em !important;
  margin: 20px 0px;
}

div.chart {
  position: relative;
  width: 100%;
  display: flex;
  /* -webkit-box-pack: center; */
  -ms-flex-pack: center;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  flex-direction: column;
  /* justify-content: center; */
  /* width: 70%; */
  /* justify-content: flex-start; */
  margin: 0 auto;
  /* width: 70%; */
  -ms-flex-wrap: wrap;

  .rating-star {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }
  /* flex-wrap: wrap; */
}
</style>

