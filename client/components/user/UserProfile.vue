<template>
  <v-row justify="center">
    <v-dialog v-model="isAccountDialogOpen" persistent max-width="600px">
      <!-- <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on">Open Dialog</v-btn>
      </template> -->
      <v-card>
        <v-card-title>
          <span class="headline">Account</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field label="First Name" v-model="firstName"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  label="Last Name"
                  v-model="lastName"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Email" v-model="email" disabled></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeDialog">Close</v-btn>
          <v-btn color="blue darken-1" text @click="onSave">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>


<script>
export default {
  name: "userProfile",
  data() {
    return {
      firstName: "",
      lastName: ""
    };
  },

  mounted() {
    this.firstName = "";
    this.lastName = "";
    this.firstName = localStorage.getItem("fname")
      ? localStorage.getItem("fname")
      : "";
    this.lastName = localStorage.getItem("lname")
      ? localStorage.getItem("lname")
      : "";
  },
  computed: {
    isAccountDialogOpen() {
      return this.$store.getters.isAccountDialogOpen;
    },
    email() {
      return this.$store.getters.email;
    }
  },

  methods: {
    onSave() {
      localStorage.setItem("fname", this.firstName);
      localStorage.setItem("lname", this.lastName);
      this.closeDialog();
    },
    closeDialog() {
      this.$store.commit("changeAccountDialogState", false);
    }
  }
};
</script>
