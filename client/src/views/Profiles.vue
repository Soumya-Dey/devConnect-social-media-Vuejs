<template>
  <section class="container">
    <Spinner v-if="profileLoadingStatus" />
    <div v-else>
      <h1 class="large text-primary">Developers</h1>
      <p class="lead">
        <i class="fab fa-connectdevelop"></i> &nbsp;Browse
        and connect with developers
      </p>
      <div class="profiles" v-if="allProfiles.length > 0">
        <ProfileItem v-for="profile in allProfiles" :key="profile._id" :profile="profile" />
      </div>
      <h4 v-else>No profiles found...</h4>
    </div>
  </section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import ProfileItem from "../components/profiles/ProfileItem";
import Spinner from "../components/layouts/Spinner";

export default {
  name: "Profiles",
  components: {
    ProfileItem,
    Spinner,
  },
  computed: mapGetters(["profileLoadingStatus", "allProfiles"]),
  methods: {
    ...mapActions(["getAllProfiles"]),
  },
  created: function () {
    this.getAllProfiles();
  },
};
</script>

<style>
</style>