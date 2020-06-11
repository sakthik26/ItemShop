<template>
  <div>
    <v-tabs
      v-model="tab"
      grow
      background-color="primary"
      dark
    >
      <v-tab
        v-for="item in visibleTabs"
        :key="item.tab"
      >
        {{ item.tab }}
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item
        v-for="item in visibleTabs"
        :key="item.tab"
      >

        <v-card flat>
          <v-card-text>
             <div v-if="item.tab === 'Sizing'">
              <div class="images" v-viewer="{movable: false,toolbar: false,title: false}">
                <a v-on:click="openSizing">Size Chart</a>
               <img id='hidden' ref="image"  :src="src"></img>
             </div>

            <no-ssr>
            <viewer :navbar="false">
              <img :src="src" :key="src">
            </viewer>
            </no-ssr>
           </div>
           <div v-else v-html="item.content"></div>
       </v-card-text>
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
  props: ["src", "description"],
  data() {
    return {
      tab: null,

      items: [
        { tab: "Details", content: "" },
        {
          tab: "Sizing",
          content: "test"
        },
        { tab: "Shipping & Returns", content: "Default shipping content" }
      ]
    };
  },
  computed: {
    visibleTabs() {
      this.items[0].content = this.description;
      if (this.src == "") {
        this.items.splice(1, 1);
        return this.items;
      } else {
        return this.items;
      }
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
