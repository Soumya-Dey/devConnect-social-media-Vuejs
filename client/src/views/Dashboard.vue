<template>
  <section class="container">
    <Spinner v-if="profileLoadingStatus" />
    <div v-else>
      <h1 class="large text-primary">Dashboard</h1>
      <h1 class="lead">
        <i class="fas fa-user"></i>
        &nbsp;Welcome,
        {{currentUser ? currentUser.name : 'Unknown user'}}
      </h1>
      <div v-if="currentProfile !== null">
        <DashboardActions />
        <div class="table-container">
          <div>
            <Experience :experiences="currentProfile.experience" />
          </div>
          <div>
            <Education :educations="currentProfile.education" />
          </div>
        </div>
      </div>
      <div v-else>
        <p>You haven't yet set up a profile, please add some info</p>
        <router-link to="/create-profile" class="btn btn-primary my-1 mr">Create Profile</router-link>
      </div>
      <button class="btn btn-danger my-2" @click="deleteAccount">
        <i class="fas fa-user-minus" /> &nbsp;Delete Account
      </button>
    </div>
  </section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import DashboardActions from "../components/dashboard/DashboardActions";
import Experience from "../components/dashboard/Experience";
import Education from "../components/dashboard/Education";
import Spinner from "../components/layouts/Spinner";

export default {
  name: "Dashboard",
  components: {
    DashboardActions,
    Experience,
    Education,
    Spinner,
  },
  methods: {
    ...mapActions(["getCurrentProfile", "deleteAccount"]),
  },
  computed: mapGetters([
    "profileLoadingStatus",
    "currentProfile",
    "currentUser",
  ]),
  created: function () {
    this.getCurrentProfile();
  },
};
</script>

<style>
</style>