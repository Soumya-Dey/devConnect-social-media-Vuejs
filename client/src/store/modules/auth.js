import axios from "axios";

import setAuthToken from "../../utils/setAuthToken";

const state = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    loading: true,
    user: null,
};

const getters = {
    currentUser: (state) => state.token,
};

const actions = {
    async setToken({ commit }) {
        commit("SET_TOKEN");
    },
    async loadUser({ commit }) {
        if (localStorage.token) setAuthToken(localStorage.token);

        try {
            const res = await axios.get("/api/auth");

            if (!res) commit("LOGOUT_OR_AUTH_FAIL");

            commit("USER_LOADED", res.data);
        } catch (error) {
            commit("LOGOUT_OR_AUTH_FAIL");
        }
    },
    async register({ commit, dispatch }, { name, email, password }) {
        try {
            // get the token after register
            // returns the token upon sucessfull authentication
            const res = await axios.post(
                "/api/users",
                JSON.stringify({ name, email, password }),
                { headers: { "Content-Type": "application/json" } }
            );

            // send the token to the reducer
            commit("REGISTER_LOGIN_SUCCESS", res.data);

            // load user after registration
            dispatch("loadUser");
        } catch (error) {
            const errArr = error.response.data.errors;

            // send the errors to the alert reducer
            if (errArr) {
                errArr.forEach((errItem) =>
                    dispatch("setAlert", {
                        msg: errItem.msg,
                        alertType: "danger",
                    })
                );
            }

            commit("LOGOUT_OR_AUTH_FAIL");
        }
    },
    async login({ commit, dispatch }, { email, password }) {
        try {
            // get the token after logging in
            // returns the token upon sucessfull authentication
            const res = await axios.post(
                "/api/auth",
                JSON.stringify({ email, password }),
                { headers: { "Content-Type": "application/json" } }
            );

            // send the token to the reducer
            commit("REGISTER_LOGIN_SUCCESS", res.data);

            // load the user after login
            dispatch("loadUser");
        } catch (error) {
            const errArr = error.response.data.errors;

            // send the errors to the alert reducer
            if (errArr) {
                errArr.forEach((errItem) =>
                    dispatch("setAlert", {
                        msg: errItem.msg,
                        alertType: "danger",
                    })
                );
            }

            commit("LOGOUT_OR_AUTH_FAIL");
        }
    },
    async forgotPassword({ dispatch }, { email }) {
        try {
            // send email
            await axios.post("/api/auth/forgot", JSON.stringify({ email }), {
                headers: { "Content-Type": "application/json" },
            });

            // send the token to the reducer
            dispatch("setAlert", {
                msg: `Email sent to ${email} with reset link`,
                alertType: "success",
            });
        } catch (error) {
            const errArr = error.response.data.errors;

            // send the errors to the alert reducer
            if (errArr) {
                errArr.forEach((errItem) =>
                    dispatch("setAlert", {
                        msg: errItem.msg,
                        alertType: "danger",
                    })
                );
            }
        }
    },
    async resetPassword({ dispatch }, { password, resetPasswordId }) {
        try {
            // reset password
            await axios.post(
                `/api/auth/reset/${resetPasswordId}`,
                JSON.stringify({ password }),
                { headers: { "Content-Type": "application/json" } }
            );

            // send the token to the reducer
            dispatch("setAlert", {
                msg: `Password changed successfully, Login again`,
                alertType: "success",
            });
        } catch (error) {
            const errArr = error.response.data.errors;

            // send the errors to the alert reducer
            if (errArr) {
                errArr.forEach((errItem) =>
                    dispatch("setAlert", {
                        msg: errItem.msg,
                        alertType: "danger",
                    })
                );
            }
        }
    },
    async logout({ commit }) {
        commit("LOGOUT_OR_AUTH_FAIL");
    },
};

const mutations = {
    SET_TOKEN: (state) => {
        state.token = localStorage.getItem("token");
    },
    USER_LOADED: (state, payload) => {
        state.isAuthenticated = true;
        state.user = payload;
        state.loading = false;
    },
    REGISTER_LOGIN_SUCCESS: (state, payload) => {
        localStorage.setItem("token", payload.token);
        state.token = payload.token;
        state.isAuthenticated = true;
        state.loading = false;
    },
    LOGOUT_OR_AUTH_FAIL: (state) => {
        localStorage.removeItem("token");
        state.token = null;
        state.isAuthenticated = false;
        state.loading = false;
    },
};

export default {
    state,
    getters,
    actions,
    mutations,
};
