export const state = () => ({
  products: [
  ],
  // products: [
  //   {
  //     id: 1,
  //     title: 'Product 1',
  //     description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
  //     price: 50,
  //     ratings: 3,
  //     reviews: 5,
  //     isAddedToCart: false,
  //     isAddedBtn: false,
  //     isFavourite: false,
  //     quantity: 1
  //   },
  //   {
  //     id: 2,
  //     title: 'Product 2',
  //     description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
  //     price: 35,
  //     ratings: 5,
  //     reviews: 10,
  //     isAddedToCart: false,
  //     isAddedBtn: false,
  //     isFavourite: false,
  //     quantity: 1
  //   },
  //   {
  //     id: 3,
  //     title: 'Product 3',
  //     description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
  //     price: 110,
  //     ratings: 2,
  //     reviews: 3,
  //     isAddedToCart: false,
  //     isAddedBtn: false,
  //     isFavourite: false,
  //     quantity: 1
  //   },
  //   {
  //     id: 4,
  //     title: 'Product 4',
  //     description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
  //     price: 50,
  //     ratings: 1,
  //     reviews: 0,
  //     isAddedToCart: false,
  //     isAddedBtn: false,
  //     isFavourite: false,
  //     quantity: 1
  //   },
  //   {
  //     id: 5,
  //     title: 'Product 5',
  //     description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
  //     price: 35,
  //     ratings: 4,
  //     reviews: 2,
  //     isAddedToCart: false,
  //     isAddedBtn: false,
  //     isFavourite: false,
  //     quantity: 1
  //   },
  //   {
  //     id: 6,
  //     title: 'Product 6',
  //     description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
  //     price: 110,
  //     ratings: 5,
  //     reviews: 1,
  //     isAddedToCart: false,
  //     isAddedBtn: false,
  //     isFavourite: false,
  //     quantity: 1
  //   },
  //   {
  //     id: 7,
  //     title: 'Product 7',
  //     description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
  //     price: 50,
  //     ratings: 5,
  //     reviews: 7,
  //     isAddedToCart: false,
  //     isAddedBtn: false,
  //     isFavourite: false,
  //     quantity: 1
  //   },
  //   {
  //     id: 8,
  //     title: 'Product 8',
  //     description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
  //     price: 35,
  //     ratings: 3,
  //     reviews: 0,
  //     isAddedToCart: false,
  //     isAddedBtn: false,
  //     isFavourite: false,
  //     quantity: 1
  //   },
  //   {
  //     id: 9,
  //     title: 'Product 9',
  //     description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
  //     price: 110,
  //     ratings: 4,
  //     reviews: 2,
  //     isAddedToCart: false,
  //     isAddedBtn: false,
  //     isFavourite: false,
  //     quantity: 1
  //   }
  // ],

  userInfo: {
    isLoggedIn: false,
    isSignedUp: false,
    hasSearched: false,
    name: '',
    productTitleSearched: '',
    isAccountDialogOpen: false,
    email: '',
  },
  systemInfo: {
    openLoginModal: false,
    openSignupModal: false,
    showProgressLoader: false,
    openCheckoutModal: false
  },
  cart: {
    items: [],
    subTotal: '',
    redirectToPath: '',
  },
  showCheckoutDrawer: false,
  showCheckoutLoader: false,
  reviews: [],
  tabs: [],
  selectedTab: '',
  filterVal: 'Featured',
})

export const getters = {
  showCheckoutLoader: state => {
    return state.showCheckoutLoader
  },
  products: state => {
    return state.products
  },
  selectedTab: state => {
    return state.selectedTab
  },
  productsAdded: state => {
    return state.products.filter(el => {
      return el.isAddedToCart;
    });
  },
  productsAddedToFavourite: state => {
    return state.products.filter(el => {
      return el.isFavourite;
    });
  },
  getProductById: state => id => {
    return state.products.find(product => product.id == id);
  },

  isUserLoggedIn: state => {
    return state.userInfo.isLoggedIn;
  },
  isUserSignedUp: state => {
    return state.userInfo.isSignedUp;
  },
  getUserName: state => {
    return state.userInfo.name;
  },
  isLoginModalOpen: state => {
    return state.systemInfo.openLoginModal;
  },
  showProgressLoader: state => {
    return state.systemInfo.showProgressLoader;
  },
  isSignupModalOpen: state => {
    return state.systemInfo.openSignupModal;
  },
  isCheckoutModalOpen: state => {
    return state.systemInfo.openCheckoutModal;
  },
  quantity: state => {
    return state.products.quantity;
  },
  cartItems: state => {
    return state.cart;
  },
  showCheckoutDrawer: state => {
    return state.showCheckoutDrawer
  },
  redirectToPath: state => {
    return state.cart.redirectToPath
  },
  isAccountDialogOpen: state => {
    return state.userInfo.isAccountDialogOpen
  },
  email: state => {
    return state.userInfo.email
  },
  reviews: state => {
    return state.reviews
  },
  tabs: state => {
    return state.tabs
  },
  filterVal: state => {
    return state.filterVal
  }
  // subTotal: state => {
  //   return state.cart.subTotal;
  // }

}

export const mutations = {
  resetProductReviews: (state) => {
    state.reviews = []
  },
  setFilterValue: (state, filterVal) => {
    state.filterVal = filterVal
  },
  redirectToPath: (state, path) => {
    state.cart.redirectToPath = path
  },
  setTabContent: (state, tabs) => {
    state.tabs = tabs
  },
  setTabSelected: (state, tabId) => {
    state.selectedTab = tabId
  },
  showCheckoutLoader: (state, showLoader) => {
    state.showCheckoutDrawer = showLoader
  },
  openCheckoutDrawer: (state) => {
    state.showCheckoutDrawer = true
  },
  closeCheckoutDrawer: (state) => {
    state.showCheckoutDrawer = false
  },
  addToCart: (state, productInformation) => {
    state.showCheckoutDrawer = true
    var itemIndex = state.cart.items.map(item => {
      return item.id
    }).indexOf(productInformation.id)
    if (itemIndex == -1) {
      state.cart.items.splice(state.cart.items.length, 0, productInformation)
    }
    else {
      if (state.cart.items[itemIndex].quantity < 10) {
        state.cart.items[itemIndex].quantityExceeded = false
        state.cart.items[itemIndex].quantity = ++state.cart.items[itemIndex].quantity
        state.cart.items[itemIndex].cumulativePrice = ('' + state.cart.items[itemIndex].quantity * parseFloat(state.cart.items[itemIndex].price)).slice(0, 5)
      }
      else {
        state.cart.items[itemIndex].quantityExceeded = true
      }
    }
    var total = 0;
    for (var i = 0; i < state.cart.items.length; i++) {
      total += parseFloat(state.cart.items[i].cumulativePrice)
    }
    state.cart.subTotal = state.cart.items[0].currency + ' ' + ('' + total).slice(0, 6)
  },
  changeQuantity: (state, val) => {
    var itemIndex = state.cart.items.map(item => {
      return item.id
    }).indexOf(val.id)
    if (val.operation === 'add') {
      if (state.cart.items[itemIndex].quantity < 10) {

        state.cart.items[itemIndex].quantity = ++state.cart.items[itemIndex].quantity
        state.cart.items[itemIndex].quantityExceeded = false
      }
      else
        state.cart.items[itemIndex].quantityExceeded = true

    }
    else {
      state.cart.items[itemIndex].quantity = --state.cart.items[itemIndex].quantity
      state.cart.items[itemIndex].quantityExceeded = false

    }

    state.cart.items[itemIndex].cumulativePrice = ('' + state.cart.items[itemIndex].quantity * parseFloat(state.cart.items[itemIndex].price)).slice(0, 5)
    if (state.cart.items[itemIndex].quantity == 0) {

      state.cart.items.splice(itemIndex, 1)

    }
    var total = 0;
    for (var i = 0; i < state.cart.items.length; i++) {
      total += parseFloat(state.cart.items[i].cumulativePrice)
    }
    //change currency
    state.cart.subTotal = state.cart.items.length > 0 ? state.cart.items[0].currency + ' ' + ('' + total).slice(0, 5) : 'EUR 0.00'
  },
  setAddedBtn: (state, data) => {
    state.products.forEach(el => {
      if (data.id === el.id) {
        el.isAddedBtn = data.status;
      }
    });
  },
  removeFromCart: (state, id) => {
    state.products.forEach(el => {
      if (id === el.id) {
        el.isAddedToCart = false;
      }
    });
  },
  removeProductsFromFavourite: state => {
    state.products.filter(el => {
      el.isFavourite = false;
    });
  },
  isUserLoggedIn: (state, isUserLoggedIn) => {
    state.userInfo.isLoggedIn = isUserLoggedIn;
  },
  showProgressLoader: (state, showProgressLoader) => {
    state.systemInfo.showProgressLoader = showProgressLoader;
  },
  isUserSignedUp: (state, isSignedUp) => {
    state.userInfo.isSignedUp = isSignedUp;
  },
  setHasUserSearched: (state, hasSearched) => {
    state.userInfo.hasSearched = hasSearched;
  },
  setUserName: (state, name) => {
    state.userInfo.name = name;
  },
  setProductTitleSearched: (state, titleSearched) => {
    state.userInfo.productTitleSearched = titleSearched;
  },
  showLoginModal: (state, show) => {
    state.systemInfo.openLoginModal = show;
  },
  showSignupModal: (state, show) => {
    state.systemInfo.openSignupModal = show;
  },
  showCheckoutModal: (state, show) => {
    state.systemInfo.openCheckoutModal = show;
  },
  addToFavourite: (state, id) => {
    state.products.forEach(el => {
      if (id === el.id) {
        el.isFavourite = true;
      }
    });
  },
  removeFromFavourite: (state, id) => {
    state.products.forEach(el => {
      if (id === el.id) {
        el.isFavourite = false;
      }
    });
  },
  quantity: (state, data) => {
    state.products.forEach(el => {
      if (data.id === el.id) {
        el.quantity = data.quantity;
      }
    });
  },
  SET_USER(state, authUser) {
    state.authUser = authUser
  },
  populateProductsList(state, productsList) {
    state.products = productsList
  },
  changeAccountDialogState(state, flag) {
    state.userInfo.isAccountDialogOpen = flag
  },
  setEmail(state, email) {
    state.userInfo.email = email
  },
  populateProductReviews(state, reviews) {
    for (var i = 0; i < reviews.length; i++)
      state.reviews.splice(state.reviews.length, 0, reviews[i])
  }
}

export const actions = {
  // async nuxtServerInit({ commit }) {
  //   const res = await this.$axios.get("/api/current_user")
  //   commit("SET_USER", res.data)
  // },

  // async logout({ commit }) {
  //   const { data } = await this.$axios.get("/api/logout")
  //   if (data.ok) commit("SET_USER", null)
  // },

  // async handleToken({ commit }, token) {
  //   const res = await this.$axios.post("/api/stripe", token)
  //   commit("SET_USER", res.data)
  // }

  // async fetchAllProducts({ commit }) {
  //   console.log('test')
  //   const products = await this.$shopify.product.fetchAll();
  //   console.log(products)
  // }

}
