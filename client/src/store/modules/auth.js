import axios from "axios";

import setAuthToken from "../../utils/setAuthToken";
import router from "../../router/index";

const state = {
    auth: {
        token: localStorage.getItem("token"),
        isAuthenticated: false,
        loading: true,
        user: null,
    },
};

const getters = {
    currentUser: (state) => state.auth.user,
    authenticationStatus: (state) => state.auth.isAuthenticated,
    authLoadingStatus: (state) => state.auth.loading,
};

const actions = {
    async setToken({ commit }) {
        commit("SET_TOKEN");
    },
    async loadUser({ commit }) {
        if (localStorage.token) setAuthToken(localStorage.token);

        try {
            const res = await axios.get("http://localhost:5000/api/auth");

            commit("USER_LOADED", res.data);

            router.push("/dashboard");
        } catch (error) {
            commit("LOGOUT_OR_AUTH_FAIL");
        }
    },
    async register({ commit, dispatch }, { name, email, password }) {
        try {
            // get the token after register
            // returns the token upon sucessfull authentication
            const res = await axios.post(
                "http://localhost:5000/api/users",
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
                "http://localhost:5000/api/auth",
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
            await axios.post(
                "http://localhost:5000/api/auth/forgot",
                JSON.stringify({ email }),
                {
                    headers: { "Content-Type": "application/json" },
                }
            );

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
                `http://localhost:5000/api/auth/reset/${resetPasswordId}`,
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
        commit("CLEAR_PROFILE", null, { root: true }); // from profile module, hence {root: true}
        commit("LOGOUT_OR_AUTH_FAIL");
    },
};

const mutations = {
    SET_TOKEN: (state) => {
        state.auth = { ...state.auth, token: localStorage.getItem("token") };
    },
    USER_LOADED: (state, payload) => {
        state.auth = {
            ...state.auth,
            isAuthenticated: true,
            user: payload,
            loading: false,
        };
    },
    REGISTER_LOGIN_SUCCESS: (state, payload) => {
        localStorage.setItem("token", payload.token);
        state.auth = {
            ...state.auth,
            token: payload.token,
            isAuthenticated: true,
            loading: false,
        };
    },
    LOGOUT_OR_AUTH_FAIL: (state) => {
        localStorage.removeItem("token");
        state.auth = {
            user: null,
            token: null,
            isAuthenticated: false,
            loading: false,
        };
    },
};

export default {
    state,
    getters,
    actions,
    mutations,
};
