<template>
  <section v-if="this.allAlerts !==null && this.allAlerts.length > 0">
    <div
      v-for="alert in this.allAlerts"
      :key="alert.id"
      class="alert"
      :class="'alert-' + alert.alertType"
    >{{alert.msg}}</div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Alert",
  computed: mapGetters(["allAlerts"]),
};
</script>

<style>
</style>