<template>
  <section class="container">
    <h1 class="large text-primary">Sign In</h1>
    <p class="lead">
      <i class="fas fa-user"></i> &nbsp;Sign into Your Account
    </p>
    <form class="form" @submit="onSubmit">
      <div class="form-group">
        <input
          type="email"
          placeholder="Email Address"
          name="email"
          v-model="formData.email"
          required
        />
      </div>
      <div class="form-group">
        <input type="password" placeholder="Password" name="password" v-model="formData.password" />
      </div>
      <input type="submit" class="btn btn-primary" value="Login" />
    </form>
    <p class="my-1">
      Don't have an account?
      <router-link to="/register">Sign Up</router-link>
    </p>
    <p class="my-1 x-small-light">
      <router-link to="/forgot">Forgotten Password</router-link>
    </p>
  </section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Login",
  data: function () {
    return {
      formData: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    ...mapActions(["login"]),
    onSubmit(event) {
      event.preventDefault();

      this.login(this.formData);
    },
  },
  computed: mapGetters(["authenticationStatus"]),
  created: function () {
    if (this.authenticationStatus) this.$router.push("/dashboard");
  },
};
</script>

<style>
</style>