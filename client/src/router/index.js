import Vue from "vue";
import VueRouter from "vue-router";
import Landing from "../views/Landing.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Landing",
        component: Landing,
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
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;
