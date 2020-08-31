import axios from "axios";

import router from "../../router/index";

const state = {
    profile: {
        profile: null,
        profiles: [],
        repos: [],
        loading: true,
        error: {},
    },
};

const getters = {
    currentProfile: (state) => state.profile.profile,
    allProfiles: (state) => state.profile.profiles,
    profileRepos: (state) => state.profile.repos,
    profileLoadingStatus: (state) => state.profile.loading,
    profileError: (state) => state.profile.error,
};

const actions = {
    async getCurrentProfile({ commit }) {
        try {
            // get the profile
            const res = await axios.get("http://localhost:5000/api/profile/me");

            // send the profile data to the reducer
            commit("GET_OR_UPDATE_PROFILE", res.data);
        } catch (error) {
            // send the error data to reducer
            commit("PROFILE_ERROR", {
                msg: error.response.statusText,
                status: error.response.status,
            });
        }
    },
    async getAllProfiles({ commit }) {
        commit("CLEAR_PROFILE");

        try {
            const res = await axios.get("http://localhost:5000/api/profile");

            // send the profiles data to the reducer
            commit("GET_ALL_PROFILES", res.data);
        } catch (error) {
            // send the error data to reducer
            commit("PROFILE_ERROR", {
                msg: error.response.statusText,
                status: error.response.status,
            });
        }
    },
    async getProfileById({ commit }, { userId }) {
        try {
            const res = await axios.get(
                `http://localhost:5000/api/profile/user/${userId}`
            );

            // send the profile data to the reducer
            commit("GET_OR_UPDATE_PROFILE", res.data);
        } catch (error) {
            // send the error data to reducer
            commit("PROFILE_ERROR", {
                msg: error.response.statusText,
                status: error.response.status,
            });
        }
    },
    async getGithubRepos({ commit }, { githubUsername }) {
        try {
            const res = await axios.get(
                `http://localhost:5000/api/profile/github/${githubUsername}`
            );

            // send the repository data to the reducer
            commit("GET_GITHUB_REPOS", res.data);
        } catch (error) {
            // send the error data to reducer
            commit("NO_REPOS");
        }
    },
    // for creating or updating a profile
    // formData -> data we get from the form
    async createProfile({ commit, dispatch }, { formData, isEditing = false }) {
        try {
            // create or update profile
            const res = await axios.post(
                "http://localhost:5000/api/profile",
                formData,
                {
                    headers: { "Content-Type": "application/json" },
                }
            );

            // send the profile data to the reducer
            commit("GET_OR_UPDATE_PROFILE", res.data);

            // show an alert
            dispatch("setAlert", {
                msg: isEditing
                    ? "Profile updated successfully"
                    : "Profile created successfully",
                alertType: "success",
            });

            window.scrollTo(0, 0);

            // if creating profile then redirect to dashboard
            if (!isEditing) router.push("/dashboard");
        } catch (error) {
            // validation errors
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

            // send the error data to reducer
            commit("PROFILE_ERROR", {
                msg: error.response.statusText,
                status: error.response.status,
            });
        }
    },
    async addFollowerFollowing({ commit, dispatch }, { userToFollowId }) {
        try {
            // add follower and following
            const res = await axios.put(
                `http://localhost:5000/api/profile/follow/${userToFollowId}`
            );

            // send the profile data to the reducer
            commit("UPDATE_FOLLOWERS", res.data);

            // show an alert
            dispatch("setAlert", {
                msg: "User followed successfully",
                alertType: "success",
            });
        } catch (error) {
            // send the error data to reducer
            commit("FOLLOW_ERROR");
        }
    },
    async removeFollowerFollowing({ commit, dispatch }, { userToUnfollowId }) {
        try {
            // remove follower and following
            const res = await axios.delete(
                `http://localhost:5000/api/profile/unfollow/${userToUnfollowId}`
            );

            // send the profile data to the reducer
            commit("UPDATE_FOLLOWERS", res.data);

            // show an alert
            dispatch("setAlert", {
                msg: "User unfollowed successfully",
                alertType: "dark",
            });
        } catch (error) {
            // send the error data to reducer
            commit("FOLLOW_ERROR");
        }
    },
    async addExperience({ commit, dispatch }, { formData }) {
        try {
            // create or update profile
            const res = await axios.put(
                "http://localhost:5000/api/profile/experience",
                formData,
                {
                    headers: { "Content-Type": "application/json" },
                }
            );

            // send the profile data to the reducer
            commit("GET_OR_UPDATE_PROFILE", res.data);

            // show an alert
            dispatch("setAlert", {
                msg: "Experience added successfully",
                alertType: "success",
            });

            router.push("/dashboard");

            window.scrollTo(0, 0);
        } catch (error) {
            // validation errors
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

            // send the error data to reducer
            commit("PROFILE_ERROR", {
                msg: error.response.statusText,
                status: error.response.status,
            });
        }
    },
    async addEducation({ commit, dispatch }, { formData }) {
        try {
            // create or update profile
            const res = await axios.put(
                "http://localhost:5000/api/profile/education",
                formData,
                {
                    headers: { "Content-Type": "application/json" },
                }
            );

            // send the profile data to the reducer
            commit("GET_OR_UPDATE_PROFILE", res.data);

            // show an alert
            dispatch("setAlert", {
                msg: "Education added successfully",
                alertType: "success",
            });

            router.push("/dashboard");

            window.scrollTo(0, 0);
        } catch (error) {
            // validation errors
            // validation errors
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

            // send the error data to reducer
            commit("PROFILE_ERROR", {
                msg: error.response.statusText,
                status: error.response.status,
            });
        }
    },
    async deleteExperience({ commit, dispatch }, { expId }) {
        try {
            // delete the experience by id
            const res = await axios.delete(
                `http://localhost:5000/api/profile/experience/${expId}`
            );

            // send the updated profile data to the reducer
            commit("GET_OR_UPDATE_PROFILE", res.data);

            // show an alert
            dispatch("setAlert", {
                msg: "Experience removed successfully",
                alertType: "success",
            });
        } catch (error) {
            // send the error data to reducer
            commit("PROFILE_ERROR", {
                msg: error.response.statusText,
                status: error.response.status,
            });
        }
    },
    async deleteEducation({ commit, dispatch }, { eduId }) {
        try {
            // delete the education by id
            const res = await axios.delete(
                `http://localhost:5000/api/profile/education/${eduId}`
            );

            // send the updated profile data to the reducer
            commit("GET_OR_UPDATE_PROFILE", res.data);

            // show an alert
            dispatch("setAlert", {
                msg: "Education removed successfully",
                alertType: "success",
            });
        } catch (error) {
            // send the error data to reducer
            commit("PROFILE_ERROR", {
                msg: error.response.statusText,
                status: error.response.status,
            });
        }
    },
    async deleteAccount({ commit, dispatch }) {
        if (
            window.confirm(
                "Are you absolutely sure you want to delete your account?"
            )
        ) {
            try {
                await axios.delete("http://localhost:5000/api/profile");

                commit("CLEAR_PROFILE");
                commit("LOGOUT_OR_AUTH_FAIL", null, { root: true }); // from auth module, hence {root: true}

                dispatch("setAlert", {
                    msg: "Your account has been permanently deleted",
                    alertType: "dark",
                });
            } catch (error) {
                // send the error data to reducer
                commit("PROFILE_ERROR", {
                    msg: error.response.statusText,
                    status: error.response.status,
                });
            }
        }
    },
};

const mutations = {
    GET_OR_UPDATE_PROFILE: (state, payload) => {
        state.profile = {
            ...state.profile,
            profile: payload,
            loading: false,
        };
    },
    GET_ALL_PROFILES: (state, payload) => {
        state.profile = {
            ...state.profile,
            profiles: payload,
            loading: false,
        };
    },
    GET_GITHUB_REPOS: (state, payload) => {
        state.profile = {
            ...state.profile,
            repos: payload,
            loading: false,
        };
    },
    NO_REPOS: (state) => {
        state.profile = {
            ...state.profile,
            repos: [],
            loading: false,
        };
    },
    UPDATE_FOLLOWERS: (state, payload) => {
        state.profile = {
            ...state.profile,
            profile: { ...state.profile.profile, followers: payload },
            loading: false,
        };
    },
    FOLLOW_ERROR: (state) => {
        state.profile = {
            ...state.profile,
            loading: false,
        };
    },
    PROFILE_ERROR: (state, payload) => {
        state.profile = {
            ...state.profile,
            error: payload,
            loading: false,
            profile: null,
        };
    },
    CLEAR_PROFILE: (state) => {
        state.profile = {
            ...state.profile,
            profile: null,
            repos: [],
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
