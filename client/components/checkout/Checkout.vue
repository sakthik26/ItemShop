<template>
      <v-navigation-drawer
      class="navigation"
        v-model="drawer"

        :expand-on-hover="expandOnHover"
        :mini-variant="miniVariant"
        :right="right"
        :fixed ="fixed"
        :hide-overlay="hideOverlay"
        :src="bg"
        absolute
      >
          <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="title">
            Shopping Cart
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-list-item-content>
              <ul class="minicart__list">
                <li v-for="item in cartItems.items" v-if="item.quantity>0" v-bind:key="item.id" class="minicart-line-item">

                <div class="minicart-line-item__image">
                  <!-- <a href="/products/circular-sienna" title="View Circular (Sienna) - S"> -->
                  <img :src="item.image">
                  <!-- </a> -->
                </div>
                <div class="minicart-line-item__info">
                  <h3 class="minicart-line-item__title">
                     {{item.title}}
                     </h3>
                     <div class="minicart-line-item__meta">
                       <div class="minicart-line-item__meta-container">
                       <span class="minicart-line-item__meta-option">{{item.size}}</span>
                       </div>
                    </div>
                    <div class="qty">
                      <div class="qty__form">
                        <div class="qty__label">Quantity:</div>
                        <div class="qty__minus" v-on:click="changeQuantity(item.id,'sub')">–</div>
                        <input type="text" class="qty__value" :value="item.quantity" disabled="true">
                        <div class="qty__plus" v-on:click="changeQuantity(item.id,'add')">+</div>
                      </div>
                      <div class="qty__error" :class="item.quantityExceeded == true? 'show':'hide'">Requested quantity not available</div>
                    </div>
                    <div class="minicart-line-item__price">{{item.currency}} {{item.cumulativePrice}}</div>
                 </div>
                </li>
            </ul>
            <div class="minicart__subtotal">
              <h3 class="minicart__subtotal-label">Subtotal</h3>
              <div class="minicart__subtotal-value">{{cartItems.subTotal}}</div>
            </div>
            <div class="minicart__message"><p>Shipping and taxes calculated at checkout</p></div>
            <div class="minicart__actions">
               <button class="button is-primary"  :disabled="disableCheckout" v-on:click="checkout"> Checkout →</button>
            </div>
            </v-list-item-content>
          </v-list-item>

      </v-navigation-drawer>

</template>

<script>
export default {
  name: "Checkout",
  props: ["drawer"],
  data() {
    return {
      items: [],

      right: true,
      miniVariant: false,
      expandOnHover: false,
      background: false,
      fixed: true,
      hideOverlay: true
      // cartItems: {},
    };
  },
  mounted() {
    console.log("cart");
    //this.cartItems = this.$store.getters.cartItems;
    // if (this.$store.getters.cartItems.length > 0) {
    //   this.disableCheckout = false;
    // }
  },
  computed: {
    cartItems() {
      return this.$store.getters.cartItems;
    },
    disableCheckout() {
      if (this.$store.getters.cartItems.items.length > 0) return false;
      else return true;
    },
    bg() {
      return this.background
        ? "https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg"
        : undefined;
    }
  },
  methods: {
    changeQuantity(id, operation) {
      // if (quantity < 10 || operation == "sub") {
      this.$store.commit("changeQuantity", { id: id, operation: operation });
      // }
      if (this.$store.getters.cartItems.items.length == 0) {
        this.disableCheckout = true;
      }
    },
    checkout() {
      this.$store.commit("closeCheckoutDrawer");
      this.$store.commit("showLoader");
      this.$shopify.checkout.create().then(checkout => {
        // Do something with the checkout
        console.log(checkout.id);
        var checkoutId = checkout.id;
        var cartItems = this.$store.getters.cartItems;
        if (cartItems.items.length > 0) {
          const lineItemsToAdd = [];
          for (var i = 0; i < cartItems.items.length; i++) {
            lineItemsToAdd.push({
              variantId: cartItems.items[i].id,
              quantity: cartItems.items[i].quantity
            });
            // const lineItemsToAdd = [
            //   {
            //     variantId:
            //       "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8zMjkxMjk1NDI2MTY0Mw==",
            //     quantity: 4,
            //     //customAttributes: [{ key: "MyKey", value: "MyValue" }]
          }

          this.$shopify.checkout
            .addLineItems(checkoutId, lineItemsToAdd)
            .then(checkout => {
              // Do something with the updated checkout
              //Find a way to replace second level domain and subdomain

              window.location.href = checkout.webUrl.replace(
                checkout.webUrl.match("https://(.*).com")[1],
                "itemshopp"
              );
              // const checkoutId =
              //   "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0SW1hZ2UvMTgyMTc3ODc1OTI="; // ID of an existing checkout

              // const shippingAddress = {
              //   address1: "Chestnut Street 92",
              //   address2: "Apartment 2",
              //   city: "Louisville",
              //   company: null,
              //   country: "United States",
              //   firstName: "Bob",
              //   lastName: "Norman",
              //   phone: "555-625-1199",
              //   province: "Kentucky",
              //   zip: "40202"
              // };

              // // Update the shipping address for an existing checkout.
              // this.$shopify.checkout
              //   .updateShippingAddress(checkout.id, shippingAddress)
              //   .then(checkout => {
              //     console.log(checkout.lineItems);
              //     // Do something with the updated checkout
              //   }); // Array with one additional line item
              //this.$store.commit("hideLoader");
            });
        }
      });
    }
  }
  // watch: {
  //   subTotal: function(val) {
  //     this.subTotal = this.$store.getters.subTotal;
  //   }
  // },
  // computed: {
  //   bg() {
  //     return this.background
  //       ? "https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg"
  //       : undefined;
  //   }
  // }
};
</script>

<style lang="scss" scoped>
.v-navigation-drawer {
  opacity: 0.9;
  z-index: 1;
  position: fixed;
  width: 25% !important;
  background: #fff !important;
}

@media screen and (max-width: 1200px) {
  .v-navigation-drawer {
    width: 40% !important;
  }
}
@media screen and (max-width: 800px) {
  .v-navigation-drawer {
    width: 60% !important;
  }
}
@media screen and (max-width: 500px) {
  .v-navigation-drawer {
    width: 80% !important;
  }
}

.v-list-item__title.title {
  text-align: center;
  margin-top: 3%;
  padding-bottom: 5%;
  border-bottom: 1px solid #efefef;
}
.minicart-line-item__image {
  -webkit-box-flex: 0;
  -ms-flex: 0 0 60px;
  flex: 0 0 60px;
  margin: 0 1em 0 0;
}
.minicart-line-item__info {
  -webkit-box-flex: 1;
  -ms-flex: 1 1 auto;
  flex: 1 1 auto;
}
ul.minicart__list {
  list-style: none;
}
.minicart-line-item {
  padding: 1em;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: start;
  -ms-flex-align: start;
  align-items: flex-start;
  border-bottom: 1px solid #efefef;
}
.minicart-line-item__meta {
  font-size: 1.2rem;
  margin: 0.6rem 0 0.25em;
}
.minicart-line-item__meta-option {
  display: block;
  font-size: 15px;
}

.qty,
.qty__form {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  flex-wrap: wrap;
}
.minicart-line-item .qty__form {
  border: 1px solid #ddd;
  margin: 10px 0px 10px 0px;
}
.minicart-line-item .qty__label {
  display: none;
}

.minicart-line-item .qty__minus,
.minicart-line-item .qty__plus {
  font-size: 15px;
  padding: 10px;
}
.qty__minus,
.qty__plus {
  cursor: pointer;
}
.minicart-line-item .qty__value {
  padding: 0.6rem 0;
  border: 1px solid #ddd;
  border-top: 0;
  border-bottom: 0;
  margin: 0;
  max-width: 40px;
  text-align: center;
}
div.minicart-line-item__price {
  float: right;
}
.minicart__subtotal {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  padding: 1em;
}
.minicart__subtotal-label {
  font-weight: normal;
  font-size: 20px;
}
.minicart__message {
  text-align: center;
  padding: 1.6rem 3rem;
  background: #fff;
}
.minicart__actions button {
  width: 100%;
  background-color: #1976d2 !important;
}
.minicart-line-item .qty__error {
  font-size: 15px;
  color: #ff3451;
  /* margin-top: 1rem; */
  margin: 5px 0px 5px 0px;
}

.minicart-line-item .disable-add {
  pointer-events: none;
}
.minicart-line-item .show {
  display: block;
}
.minicart-line-item .hide {
  visibility: hidden;
}
</style>
