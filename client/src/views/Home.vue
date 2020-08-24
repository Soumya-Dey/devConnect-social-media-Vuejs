<template>
  <div class="home">
    <input type="submit" v-on:click="onSubmit" value="test" />
    <input type="submit" v-on:click="onSubmit2" value="delete test" />
    <p>{{ currentUser }}</p>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Home",
  components: {},
  methods: {
    ...mapActions(["setAlert", "login", "forgotPassword", "deleteAccount"]),
    onSubmit(e) {
      e.preventDefault();
      this.login({ email: "soumyadey200@gmail.com", password: "123456" });
    },
    onSubmit2(e) {
      e.preventDefault();
      this.deleteAccount();
    },
  },
  computed: mapGetters(["currentUser"]),
};
</script>

<style></style>
