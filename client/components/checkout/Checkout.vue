<template>
      <v-navigation-drawer
      class="navigation"
        v-model="drawer"
        :color="color"
        :expand-on-hover="expandOnHover"
        :mini-variant="miniVariant"
        :right="right"
        :fixed ="fixed"
        :hide-overlay="hideOverlay"
        :src="bg"
        absolute
        dark
      >
          <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="title">
            Shopping Cart
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item
            v-for="item in items"
            :key="item.title"
            link
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

</template>

<script>
export default {
  name: "Checkout",
  props: ["drawer"],
  data() {
    return {
      items: [
        { title: "Dashboard", icon: "mdi-view-dashboard" },
        { title: "Photos", icon: "mdi-image" },
        { title: "About", icon: "mdi-help-box" }
      ],
      color: "primary",
      colors: ["primary", "blue", "success", "red", "teal"],
      right: true,
      miniVariant: false,
      expandOnHover: false,
      background: false,
      fixed: true,
      hideOverlay: true
    };
  },
  methods: {},
  computed: {
    bg() {
      return this.background
        ? "https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg"
        : undefined;
    }
  }
};
</script>

<style lang="scss" scoped>
.v-navigation-drawer {
  opacity: 0.9;
  z-index: 1;
  position: fixed;
  width: 25% !important;
}
div.v-navigation-drawer__content {
  background: #fff;
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
    width: 65% !important;
  }
}

div.v-list-item__title .title {
  text-align: center;
  color: #000;
  padding-bottom: 8%;
  border-bottom: 1px solid #efefef;
}
</style>
