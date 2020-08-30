<template>
  <section class="container">
    <h1 class="large text-primary">Sign Up</h1>
    <p class="lead">
      <i class="fas fa-user"></i> &nbsp;Create Your Account
    </p>
    <form class="form" @submit="onSubmit">
      <div class="form-group">
        <input type="text" placeholder="Name" name="name" v-model="formData.name" required />
      </div>
      <div class="form-group">
        <input
          type="email"
          placeholder="Email Address"
          name="email"
          v-model="formData.email"
          required
        />
        <small class="form-text">
          * For profile image, use a
          <a
            href="https://en.gravatar.com/site/login"
            target="_blank"
            rel="noopener noreferrer"
          >Gravatar</a>
          email or create a
          <a
            href="https://en.gravatar.com/site/login"
            target="_blank"
            rel="noopener noreferrer"
          >Gravatar</a>
          account if you don't have one, then sign up here with
          that email.
          <br />You can also edit profile image after registration
        </small>
      </div>
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
      <input type="submit" class="btn btn-primary" value="Register" />
    </form>
    <p class="my-1">
      Already have an account?
      <router-link to="/login">Sign In</router-link>
    </p>
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Register",
  data: function () {
    return {
      formData: {
        name: "",
        email: "",
        password: "",
        password2: "",
      },
    };
  },
  methods: {
    ...mapActions(["register", "setAlert"]),
    onSubmit(event) {
      event.preventDefault();

      this.formData.password !== this.formData.password2
        ? this.setAlert({ msg: "Passwords dont match", alertType: "danger" })
        : this.register({
            name: this.formData.name,
            email: this.formData.email,
            password: this.formData.password,
          });
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