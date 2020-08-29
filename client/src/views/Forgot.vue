<template>
  <section class="container">
    <h1 class="large text-primary">Forgotten Password</h1>
    <p class="lead">
      <i class="fas fa-user"></i> &nbsp;Enter your registered
      email
    </p>
    <form class="form" @submit="onSubmit">
      <div class="form-group">
        <input type="email" placeholder="Email Address" name="email" v-model="email" required />
      </div>
      <input type="submit" class="btn btn-primary" value="Confirm" />
    </form>
    <p class="my-1">
      Don't have an account?
      <router-link to="/register">Sign Up</router-link>
    </p>
    <p class="my-1">
      <router-link to="/login">Login</router-link>&nbsp;instead
    </p>
  </section>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Forgot",
  data: function () {
    return {
      email: "",
    };
  },
  methods: {
    ...mapActions(["forgotPassword"]),
    onSubmit(event) {
      event.preventDefault();

      this.forgotPassword({ email: this.email });
    },
  },
};
</script>

<style>
</style>