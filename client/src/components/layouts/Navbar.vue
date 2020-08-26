<template>
    <nav class="navbar bg-dark">
        <h1>
            <router-link to="/" class="nav-h1">
                Dev <i class="fas fa-code"></i> Connect
            </router-link>
        </h1>

        <div v-if="!this.authLoadingStatus">
            <ul v-if="this.authenticationStatus">
                <li>
                    <router-link to="/posts">Posts Feed</router-link>
                </li>
                <li>
                    <router-link to="/profiles">Developers</router-link>
                </li>
                <li>
                    <router-link to="/dashboard">
                        <i class="fas fa-user"></i> &nbsp;
                        <span class="hide-sm">Dashboard</span>
                    </router-link>
                </li>
                <li>
                    <a @click="this.logout" href="/login">
                        <i class="fas fa-sign-out-alt"></i> &nbsp;
                        <span class="hide-sm">Logout</span>
                    </a>
                </li>
            </ul>
            <ul v-else>
                <li><router-link to="/profiles">Developers</router-link></li>
                <li><router-link to="/register">Register</router-link></li>
                <li><router-link to="/login">Login</router-link></li>
            </ul>
        </div>
    </nav>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
    name: "Navbar",
    methods: mapActions(["logout"]),
    computed: mapGetters(["authenticationStatus", "authLoadingStatus"]),
};
</script>

<style></style>
