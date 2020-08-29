<template>
  <section class="container">
    <h1 class="large text-primary">Reset Password</h1>
    <p class="lead">
      <i class="fas fa-user"></i> &nbsp;Create New Password
    </p>
    <form class="form" @submit="onSubmit">
      <div class="form-group">
        <input
          type="password"
          placeholder="Password"
          name="password"
          v-model="formData.password"
          minlength="6"
        />
      </div>
      <div class="form-group">
        <input
          type="password"
          placeholder="Confirm Password"
          name="password2"
          v-model="formData.password2"
          minlength="6"
        />
      </div>
      <input type="submit" class="btn btn-primary" value="Reset" />
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
  name: "Reset",
  data: function () {
    return {
      formData: {
        password: "",
        password2: "",
      },
    };
  },
  methods: {
    ...mapActions(["resetPassword", "setAlert"]),
    onSubmit(event) {
      event.preventDefault();

      this.formData.password !== this.formData.password2
        ? this.setAlert({ msg: "Passwords dont match", alertType: "danger" })
        : this.resetPassword({
            password: this.formData.password,
            resetPasswordId: this.$route.params.resetPasswordId,
          });
    },
  },
};
</script>

<style>
</style>