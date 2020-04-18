<template>
  <v-card
    class="elevation-16 mx-auto"
    width="300"
  >

    <v-card-title
      class="headline"
      primary-title
    >
      John Nash
    </v-card-title>
    <v-card-text>
     {{dateString}}
    </v-card-text>
    <!-- <div class="text-center mt-12"> -->
       <v-row
       class="customer-rating"
        align="center"

      >
        <v-rating
          :value="4.5"
          color="amber"
          dense
          half-increments
          readonly
          size="14"
        ></v-rating>

        <div class="grey--text ml-4">4.5 (413)</div>
      </v-row>
      <!-- </div> -->
    <v-card-text>
      If you enjoy using Vuetify, please take a few seconds to
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    rating: 4.5,
    date: "2020-02-13T05:42:00+00:00"
  }),

  computed: {
    dateString() {
      var currentDate = new Date(this.date);

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
}

div.customer-rating .v-rating {
  margin-left: 8%;
}
</style>
