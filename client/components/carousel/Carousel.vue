<template>
  <v-carousel
    hide-delimiter-background
  >
    <v-carousel-item
      v-for="(slide, i) in slides"
      :key="i"
    >
      <v-sheet

        height="100%"
      >
        <v-row
          class="fill-height"
          align="center"
          justify="center"
        >

          <div class="images" v-viewer="{movable: false,toolbar: false,title: false}">
            <img :src="slide"> </img>
      <!-- <img src="https://homepages.cae.wisc.edu/~ece533/images/airplane.png">-->
  <img v-for="src in slides" :src="src"></img>

    </div>

     <!-- <viewer :images="images" :navbar="false">
      <img v-for="src in images" :src="src" :key="src">
    </viewer> -->
        </v-row>
      </v-sheet>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  name: "Carousel",
  props: ["slides"],
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.footer {
  background: #b9e2fc;
  color: black;
}
div.v-carousel__item .images {
  cursor: pointer;
}

@media screen and (min-width: 300px) and (max-width: 500px) {
  div.product-detail .v-carousel {
    height: 235px !important;
  }
}
@media screen and (min-width: 501px) {
  div.product-detail .v-carousel {
    height: 350px !important;
  }
}
</style>
