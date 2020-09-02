import Vue from "vue";
import VueRouter from "vue-router";
import Landing from "../views/Landing.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/profiles",
        name: "Profiles",
        component: () => import("../views/Profiles.vue"),
    },
    {
        path: "/create-profile",
        name: "CreateOrUpdateProfile",
        component: () => import("../views/CreateOrUpdateProfile.vue"),
    },
    {
        path: "/add-education",
        name: "AddEducation",
        component: () => import("../views/AddEducation.vue"),
    },
    {
        path: "/add-experience",
        name: "AddExperience",
        component: () => import("../views/AddExperience.vue"),
    },
    {
        path: "/login",
        name: "Login",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(/* webpackChunkName: "about" */ "../views/Login.vue"),
    },
    {
        path: "/register",
        name: "Register",
        component: () => import("../views/Register.vue"),
    },
    {
        path: "/forgot",
        name: "Forgot",
        component: () => import("../views/Forgot.vue"),
    },
    {
        path: "/reset/:resetPasswordId",
        name: "Reset",
        component: () => import("../views/Reset.vue"),
    },
    {
        path: "/dashboard",
        name: "Dashboard",
        component: () => import("../views/Dashboard.vue"),
    },
    {
        path: "/",
        name: "Landing",
        component: Landing,
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;
