<template>
  <div class="home">
    <input type="submit" v-on:click="onSubmit" value="test" />
    <input type="submit" v-on:click="onSubmit2" value="posts test" />
    <p>{{ allPosts }}</p>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Home",
  components: {},
  methods: {
    ...mapActions(["setAlert", "login", "forgotPassword", "getAllPosts"]),
    onSubmit(e) {
      e.preventDefault();
      this.login({ email: "soumyadey200@gmail.com", password: "123456" });
    },
    onSubmit2(e) {
      e.preventDefault();
      this.getAllPosts();
    },
  },
  computed: mapGetters(["currentUser", "allPosts"]),
};
</script>

<style></style>
