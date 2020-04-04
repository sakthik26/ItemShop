<template>
  <v-carousel
    height="400"
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
          <img :src="slide"> </img>
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
</style>
