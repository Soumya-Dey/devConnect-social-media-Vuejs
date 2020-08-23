import { v4 as uuidv4 } from "uuid";

const state = {
    alert: [],
};

const getters = {
    allAlerts: (state) => state.alert,
};

const actions = {
    setAlert({ commit }, { msg, alertType, timeout = 5000 }) {
        const id = uuidv4();
        const payload = {
            id,
            msg,
            alertType,
        };

        commit("SET_ALERT", payload);

        setTimeout(() => {
            commit("REMOVE_ALERT", id);
        }, timeout);
    },
};

const mutations = {
    SET_ALERT: (state, payload) => (state.alert = [...state.alert, payload]),
    REMOVE_ALERT: (state, payload) =>
        state.alert.filter((al) => al.id !== payload),
};

export default {
    state,
    getters,
    actions,
    mutations,
};
