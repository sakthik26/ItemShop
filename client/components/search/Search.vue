<template>
	<p class="control has-icons-left search-container">
		<input
			class="input is-rounded"
			type="text"
			v-model="value"
			:placeholder="placeholder"
			@keyup="search(value)"
		>
		<span class="icon is-small is-left">
			<i class="fa fa-search"></i>
		</span>
	</p>
</template>

<script>
export default {
  name: "search",
  data() {
    return {
      value: ""
    };
  },

  computed: {
    placeholder() {
      if (this.$route.path === "/wishlist") {
        return "Search in wishlist...";
      } else {
        return "Search...";
      }
    }
  },

  methods: {
    search(value) {
      if (value.length > 0) {
        this.$store.commit("setHasUserSearched", true);
        this.$store.commit("setProductTitleSearched", value);
      } else {
        this.$store.commit("setHasUserSearched", false);
        this.$store.commit("setProductTitleSearched", "");
      }
    }
  }
};
</script>

<style>
p.search-container{
      width: 75%;
    margin: 0 auto;
}

p.search-container input{
  width: 20%;
    float: right;
}
</style>

