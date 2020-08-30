<template>
  <section class="container">
    <router-link class="btn btn-light mb" to="/dashboard">Go Back</router-link>
    <h1 class="large text-primary">{{currentProfile !== null ? 'Edit' : 'Create'}} Your Profile</h1>
    <p class="lead">
      <i class="fas fa-user"></i> &nbsp;Let's get some information
      to make your profile stand out
    </p>

    <p class="mb">
      <a
        href="https://en.gravatar.com/site/login"
        target="_blank"
        rel="noopener noreferrer"
        class="btn btn-white"
      >Edit Gravatar Image</a>
      <small>
        &nbsp;* Update the image of the Gravatar account with the
        same email as your devConnect account's email
      </small>
    </p>
    <small>* = required field</small>
    <form class="form" @submit="onSubmit">
      <div class="form-group">
        <select name="status" v-model="formData.status">
          <option value="0">* Select Professional Status</option>
          <option value="Developer">Developer</option>
          <option value="Junior Developer">Junior Developer</option>
          <option value="Senior Developer">Senior Developer</option>
          <option value="Manager">Manager</option>
          <option value="Student or Learning">Student or Learning</option>
          <option value="Instructor">Instructor or Teacher</option>
          <option value="Intern">Intern</option>
          <option value="Other">Other</option>
        </select>
        <small class="form-text">Give us an idea of where you are at in your career</small>
      </div>
      <div class="form-group">
        <input type="text" placeholder="Company" name="company" v-model="formData.company" />
        <small class="form-text">Could be your own company or one you work for</small>
      </div>
      <div class="form-group">
        <input type="text" placeholder="Website" name="website" v-model="formData.website" />
        <small class="form-text">Could be your own or a company website</small>
      </div>
      <div class="form-group">
        <input type="text" placeholder="Location" name="location" v-model="formData.location" />
        <small class="form-text">City & state suggested (eg. Kolkata, India)</small>
      </div>
      <div class="form-group">
        <input type="text" placeholder="* Skills" name="skills" v-model="formData.skills" />
        <small class="form-text">
          Please use comma separated values (eg. HTML, CSS,
          JavaScript, Python)
        </small>
      </div>
      <div class="form-group">
        <input
          type="text"
          placeholder="Github Username"
          name="githubusername"
          v-model="formData.githubusername"
        />
        <small class="form-text">
          If you want your latest repos and a Github link, include
          your username
        </small>
      </div>
      <div class="form-group">
        <textarea placeholder="A short bio of yourself" name="bio" v-model="formData.bio"></textarea>
        <small class="form-text">Tell us a little about yourself</small>
      </div>

      <div class="my-2">
        <button
          type="button"
          class="btn btn-light mr"
          @click="toggleSocial"
        >Add Social Network Links</button>
        <span>Optional</span>
      </div>

      <div v-if="showSocial">
        <div class="form-group social-input">
          <i class="fab fa-twitter fa-2x"></i>
          <input type="text" placeholder="Twitter URL" name="twitter" v-model="formData.teitter" />
        </div>

        <div class="form-group social-input">
          <i class="fab fa-facebook fa-2x"></i>
          <input type="text" placeholder="Facebook URL" name="facebook" v-model="formData.facebook" />
        </div>

        <div class="form-group social-input">
          <i class="fab fa-youtube fa-2x"></i>
          <input type="text" placeholder="YouTube URL" name="youtube" v-model="formData.youtube" />
        </div>

        <div class="form-group social-input">
          <i class="fab fa-linkedin fa-2x"></i>
          <input type="text" placeholder="Linkedin URL" name="linkedin" v-model="formData.linkedin" />
        </div>

        <div class="form-group social-input">
          <i class="fab fa-instagram fa-2x"></i>
          <input
            type="text"
            placeholder="Instagram URL"
            name="instagram"
            v-model="formData.instagram"
          />
        </div>
      </div>

      <input type="submit" class="btn btn-primary my-1" />
    </form>
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "CreateOrUpdateProfile",
  data: function () {
    return {
      formData: {
        company: "",
        website: "",
        location: "",
        status: "",
        skills: "",
        githubusername: "",
        bio: "",
        twitter: "",
        facebook: "",
        linkedin: "",
        youtube: "",
        instagram: "",
      },
      showSocial: false,
    };
  },
  methods: {
    ...mapActions(["createProfile", "getCurrentProfile"]),
    toggleSocial() {
      this.showSocial = !this.showSocial;
    },
    onSubmit(event) {
      event.preventDefault();

      this.createProfile({
        formData: this.formData,
        isEditing: this.currentProfile !== null,
      });
    },
  },
  computed: mapGetters(["currentProfile", "profileLoadingStatus"]),
  created: function () {
    if (!this.currentProfile) this.getCurrentProfile();

    if (!this.profileLoadingStatus && this.currentProfile) {
      // loading data from profile state to component state
      // excluding the "_id" key generated by mongoDB
      for (const key in this.currentProfile) {
        if (key in this.formData) this.formData[key] = this.currentProfile[key];
      }

      for (const key in this.currentProfile.social) {
        if (key in this.formData)
          this.formData[key] = this.currentProfile.social[key];
      }

      // joining the array elements to "," separated string
      if (Array.isArray(this.formData.skills))
        this.formData.skills = this.formData.skills.join(", ");
    }
  },
};
</script>

<style>
</style>