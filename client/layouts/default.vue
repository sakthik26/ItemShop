<template>
  <div>
    <v-app>
    <VmHeader></VmHeader>
    <main>
      <nuxt/>
      <VmLoginModal></VmLoginModal>
      <VmRegistrationModal></VmRegistrationModal>

    </main>
      <Checkout :drawer="showCheckoutDrawer"></Checkout>
    <div v-if="showCheckoutDrawer" class="outside" v-on:click="away"></div>
    <div v-if="showCheckoutLoader" class="text-center" style="
    position: fixed;
     width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0px;
  left: 0px;
  background: rgba(120, 120, 120, 0.7);
">
    <v-progress-circular
      :size="50"
      color="primary"
      indeterminate
    ></v-progress-circular>
    </div>
    <VmFooter></VmFooter>
     <div v-if="showCookieConsent">
     <Cookie/>
     </div>
    </v-app>
  </div>
</template>

<script>
import VmHeader from "@/components/header/Header";
import Checkout from "@/components/checkout/Checkout";
import VmFooter from "@/components/footer/Footer";
import Cookie from "@/components/cookie/Cookie";
import VmLoginModal from "@/components/modal/Login";
import VmRegistrationModal from "@/components/modal/Registration";

export default {
  components: {
    VmHeader,
    Cookie,
    VmFooter,
    VmLoginModal,
    Checkout,
    VmRegistrationModal
  },
  data() {
    return {
      showCookieConsent: false
    };
  },
  mounted() {
    this.showCookieConsent = localStorage.getItem("GDPR:accepted")
      ? false
      : true;
  },
  computed: {
    showCheckoutDrawer() {
      return this.$store.getters.showCheckoutDrawer;
    },
    showCheckoutLoader() {
      return this.$store.getters.showCheckoutLoader;
    }
  },
  methods: {
    away() {
      this.$store.commit("closeCheckoutDrawer");
    }
  }
};
</script>

<style>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
div.outside {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0px;
  left: 0px;
  background: rgba(120, 120, 120, 0.7);
}

/* div.loader{
  left: 50%;
    top: 50%;
    position: fixed;
} */

div.v-progress-circular {
  position: absolute;
  top: 50%;
}
</style>
