<template>
  <section class="container">
    <router-link class="btn btn-light mb" to="/dashboard">Go Back</router-link>
    <h1 class="large text-primary">Add Education</h1>
    <p class="lead">
      <i class="fas fa-code-branch" /> Add any school or bootcamp
      that you have attended
    </p>
    <small>* = required field</small>
    <form class="form" @submit="onSubmit">
      <div class="form-group">
        <input
          type="text"
          placeholder="* School or Bootcamp"
          name="school"
          v-model="formData.school"
          required
        />
      </div>
      <div class="form-group">
        <input
          type="text"
          placeholder="* Degree or Certificate"
          name="degree"
          v-model="formData.degree"
          required
        />
      </div>
      <div class="form-group">
        <input
          type="text"
          placeholder="* Field of Study"
          name="fieldofstudy"
          v-model="formData.fieldofstudy"
        />
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
          &nbsp;Current School
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
          placeholder="Program Description"
          v-model="formData.description"
        />
      </div>
      <input type="submit" class="btn btn-primary my-1" />
    </form>
  </section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "AddEducation",
  data: function () {
    return {
      formData: {
        school: "",
        degree: "",
        fieldofstudy: "",
        from: "",
        to: "",
        current: false,
        description: "",
      },
    };
  },
  methods: {
    ...mapActions(["addEducation"]),
    changeChecked() {
      this.formData.current = !this.formData.current;
    },
    onSubmit(event) {
      event.preventDefault();

      this.addEducation({ formData: this.formData });
    },
  },
  computed: mapGetters(["authenticationStatus"]),
  created: function () {
    if (!this.authenticationStatus) this.$router.push("/login");
  },
};
</script>

<style>
</style>