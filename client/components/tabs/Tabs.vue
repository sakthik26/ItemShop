<template>
  <div>
    <v-tabs
      v-model="tab"
      grow
      background-color="primary"
      dark
    >
      <v-tab
        v-for="item in items"
        :key="item.tab"
      >
        {{ item.tab }}
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item
        v-for="item in items"
        :key="item.tab"
      >
        <v-card flat>
          <v-card-text>

              <div class="images" v-viewer="{movable: false,toolbar: false,title: false}">
                <a v-on:click="openSizing">Sizing Guide</a>
       <img id='hidden' ref="image"  :src="src"></img>
    </div>

    <no-ssr>
     <viewer :navbar="false">
      <img :src="src" :key="src">
    </viewer>
    </no-ssr>

    <div v-html="item.content"></div></v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
   </div>
</template>

<script>
import Viewer from "v-viewer";
import Vue from "vue";
import "viewerjs/dist/viewer.css";
Vue.use(Viewer);
export default {
  components: { Viewer },
  props: ["src"],
  data() {
    return {
      tab: null,

      items: [
        { tab: "Details", content: "Tab 1 Content" },
        {
          tab: "Sizing",
          content: "test"
        },
        { tab: "Shipping & Returns", content: "Tab 3 Content" }
      ]
    };
  },
  computed: {
    libText: function() {
      // return directly html
      var str = "<div><p>some html</p></div>";
      return str;
    }
  },
  methods: {
    openSizing($event) {
      const elem = this.$refs.image;
      elem[0].click();
    }
  }
};
</script>
<style>
#hidden {
  display: none !important;
}
</style>
