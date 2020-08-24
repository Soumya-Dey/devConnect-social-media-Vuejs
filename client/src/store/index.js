import Vuex from "vuex";
import Vue from "vue";

import alert from "./modules/alert";
import auth from "./modules/auth";
import profile from "./modules/profile";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        alert,
        auth,
        profile,
    },
});

// TODO: complete the state for posts
