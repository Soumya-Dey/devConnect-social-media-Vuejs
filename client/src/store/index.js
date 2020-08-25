import Vuex from "vuex";
import Vue from "vue";

import alert from "./modules/alert";
import auth from "./modules/auth";
import profile from "./modules/profile";
import post from "./modules/post";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        alert,
        auth,
        profile,
        post,
    },
});
