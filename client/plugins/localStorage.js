import createPersistedState from 'vuex-persistedstate';
import * as Cookies from "js-cookie";
import SecureLS from "secure-ls";
var ls = new SecureLS({ isCompression: false });

let localStorage = {
  getItem: function (key) {
    return ls.get(key)
  },
  setItem: function (key, value) {
    return ls.set(key, value)
  },
  removeItem: function (key) {
    return ls.remove(key)
  }
};

export default ({ store }) => {
  window.onNuxtReady(() => {
    createPersistedState({
      key: 'cart',
      paths: ['cart'],
      storage: localStorage,
      getState: localStorage.getItem,
      setState: localStorage.setItem
    })(store);
  })
}
