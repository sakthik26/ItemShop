import createPersistedState from 'vuex-persistedstate';
import * as Cookies from "js-cookie";

import SecureLS from "secure-ls";
var ls = new SecureLS({ isCompression: false });

// let cookieStorage = {
//   getItem: function (key) {
//     return Cookies.getJSON(key);
//   },
//   setItem: function (key, value) {
//     return Cookies.set(key, value, { expires: 3, secure: false });
//   },
//   removeItem: function (key) {
//     return Cookies.remove(key);
//   }
// };

export default (context) => {
  createPersistedState({
    storage: {
      getItem: (key) => ls.get(key),
      setItem: (key, value) => ls.set(key, value),
      removeItem: (key) => ls.remove(key),
    },
  })(context.store);
};
