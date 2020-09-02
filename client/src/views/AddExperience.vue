<template>
  <section class="container">
    <router-link class="btn btn-light mb" to="/dashboard">Go Back</router-link>
    <h1 class="large text-primary">Add Experience</h1>
    <p class="lead">
      <i class="fas fa-code-branch"></i> Add any
      developer/programming positions that you have had in the past
    </p>
    <small>* = required field</small>
    <form class="form" @submit="onSubmit">
      <div class="form-group">
        <input type="text" placeholder="* Job Title" name="title" v-model="formData.title" required />
      </div>
      <div class="form-group">
        <input
          type="text"
          placeholder="* Company"
          name="company"
          v-model="formData.company"
          required
        />
      </div>
      <div class="form-group">
        <input type="text" placeholder="Location" name="location" v-model="formData.location" />
      </div>
      <div class="form-group">
        <h4>From Date</h4>
        <input type="date" name="from" v-model="formData.from" />
      </div>
      <div class="form-group">
        <p>
          <input
            type="checkbox"
            name="current"
            :value="formData.current"
            :checked="formData.current"
            @change="changeChecked"
          />
          &nbsp;Current Job
        </p>
      </div>
      <div class="form-group">
        <h4>To Date</h4>
        <input type="date" name="to" v-model="formData.to" :disabled="formData.current" />
      </div>
      <div class="form-group">
        <textarea
          name="description"
          cols="30"
          rows="5"
          placeholder="Job Description"
          v-model="formData.description"
        ></textarea>
      </div>
      <input type="submit" class="btn btn-primary my-1" />
    </form>
  </section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "AddExperience",
  data: function () {
    return {
      formData: {
        company: "",
        title: "",
        location: "",
        from: "",
        to: "",
        current: false,
        description: "",
      },
    };
  },
  methods: {
    ...mapActions(["addExperience"]),
    changeChecked() {
      this.formData.current = !this.formData.current;
    },
    onSubmit(event) {
      event.preventDefault();

      this.addExperience({ formData: this.formData });
    },
  },
  computed: mapGetters(["authenticationStatus"]),
  created: function () {
    setTimeout(() => {
      if (!this.authenticationStatus) this.$router.push("/login");
    }, 500);
  },
};
</script>

<style>
</style>