<template>
  <v-card
    class="elevation-16 mx-auto"
    width="300"
  >

    <v-card-title
      class="headline"
      primary-title
    >
      {{reviewProps.name}}
    </v-card-title>
    <v-card-text class="date">
     {{dateString}}
    </v-card-text>
    <div class="images" v-viewer="{movable: false,toolbar: false,title: false}">
      <!-- <img src="https://homepages.cae.wisc.edu/~ece533/images/airplane.png">-->
       <img v-for="src in reviewProps.images" :src="src">
    </div>
     <viewer :images="images" :navbar="false">
      <img v-for="src in images" :src="src" :key="src">
    </viewer>
    <!-- <div class="text-center mt-12"> -->
       <v-row
       class="customer-rating"
        align="center"

      >
        <v-rating
          :value="reviewProps.rating"
          color="amber"
          dense
          half-increments
          readonly
          size="14"
        ></v-rating>

        <div class="grey--text ml-4">{{reviewProps.rating}}</div>
      </v-row>
      <!-- </div> -->
    <v-card-text>
      {{reviewProps.body}}
    </v-card-text>
  </v-card>
</template>



<script>
import "viewerjs/dist/viewer.css";
import Viewer from "v-viewer";
import Vue from "vue";
import "viewerjs/dist/viewer.css";
Vue.use(Viewer);
export default {
  components: { Viewer },
  props: ["reviewProps"],
  data: () => ({
    images: ["https://homepages.cae.wisc.edu/~ece533/images/airplane.png"]
    // rating: 4.5,
    // date: "2020-02-13T05:42:00+00:00"
  }),

  computed: {
    dateString() {
      var currentDate = new Date(this.reviewProps.date);

      var date = currentDate.getDate();
      var month = currentDate.getMonth(); //Be careful! January is 0 not 1
      var year = currentDate.getFullYear();

      return date + "/" + (month + 1) + "/" + year;
    }
  }
};
</script>
<style>
div.customer-reviews .v-card.v-sheet {
  margin-top: 2%;
  margin-bottom: 2%;
  .customer-rating {
    pointer-events: none;
  }
}

div.customer-reviews .v-card__title.headline {
  font-size: 1rem !important;
  font-weight: 500;
  letter-spacing: 0.0125em !important;
  padding-bottom: 0px;
}

div.customer-rating .v-rating {
  margin-left: 8%;
}
div.customer-reviews .date {
  color: #999;
  font-size: 12px;
  font-weight: 400;
}
div.customer-reviews .images {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 6%;
  padding-left: 5%;
}
div.customer-reviews img {
  height: 40px;
  margin: 0% 3% 0% 0%;
}
</style>
