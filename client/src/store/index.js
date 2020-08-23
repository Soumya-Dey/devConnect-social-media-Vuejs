import Vuex from "vuex";
import Vue from "vue";

import alert from "./modules/alert";
import auth from "./modules/auth";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        alert,
        auth,
    },
});

// TODO: complete the state for profiles
// TODO: complete the state for posts
