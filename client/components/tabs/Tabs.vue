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
          <v-card-text>{{ item.content }}</v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
   </div>
</template>

<script>
export default {
  data() {
    return {
      tab: null,
      items: [
        { tab: "Details", content: "Tab 1 Content" },
        { tab: "Sizing", content: "Tab 2 Content" },
        { tab: "Shipping & Returns", content: "Tab 3 Content" }
      ]
    };
  }
};
</script>
