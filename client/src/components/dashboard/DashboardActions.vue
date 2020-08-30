<template>
  <div class="dash-buttons">
    <router-link :to="'/profile/' + currentUser._id" class="btn btn-primary mr mb">
      <i class="fas fa-user-circle"></i> &nbsp;View Profile
    </router-link>
    <router-link to="/create-profile" class="btn btn-white mr mb">
      <i class="fas fa-user-circle text-primary"></i> &nbsp;
      <span class="text-dark">Edit Profile</span>
    </router-link>
    <router-link to="/add-experience" class="btn btn-white mr mb">
      <i class="fab fa-black-tie text-primary"></i> &nbsp;
      <span class="text-dark">Add Experience</span>
    </router-link>
    <router-link to="/add-education" class="btn btn-white mr mb">
      <i class="fas fa-graduation-cap text-primary"></i> &nbsp;
      <span class="text-dark">Add Education</span>
    </router-link>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "DashboardActions",
  computed: mapGetters(["currentUser"]),
};
</script>

<style>
</style>