<template>
  <div class="profile bg-white">
    <div>
      <img class="round-img" :src="profile.user.avatar" :alt="profile.user.avatar + '\'s avatar'" />
      <div>
        <h2>{{profile.user.name}}</h2>
        <p class="status-txt">
          {{profile.status}}
          <span v-if="profile.company !== null">at {{profile.company}}</span>
        </p>
        <p class="location-txt">{{profile.location}}</p>
      </div>
    </div>

    <h3 class="text-primary mt">Skill Set</h3>

    <ul class="skills">
      <li v-for="(skill, i) in profile.skills.slice(0, 4)" :key="i" class="text-primary">
        <i class="fas fa-check"></i>
        {{skill}}
      </li>
    </ul>

    <p v-if="profile.skills.length > 4" class="more-txt text-primary">and more...</p>

    <div class="line"></div>

    <router-link :to="'/profile/' + profile.user._id" class="btn btn-primary">View Profile</router-link>
  </div>
</template>

<script>
export default {
  name: "ProfileItem",
  props: ["profile"],
};
</script>

<style>
</style>