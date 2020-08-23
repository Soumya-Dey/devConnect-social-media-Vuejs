<template>
    <div class="home">
        <input type="submit" v-on:click="onSubmit" value="test" />
        <p>{{ currentUser }}</p>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
    name: "Home",
    components: {},
    methods: {
        ...mapActions(["setAlert", "login", "forgotPassword"]),
        onSubmit(e) {
            e.preventDefault();
            this.login({ email: "soumyadey200@gmail.com", password: "123456" });
        },
    },
    computed: mapGetters(["currentUser"]),
};
</script>

<style></style>
