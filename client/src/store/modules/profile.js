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
    loadingStatus: (state) => state.profile.loading,
    error: (state) => state.profile.error,
};

const actions = {
    async getCurrentProfile({ commit }) {
        try {
            // get the profile
            const res = await axios.get("/api/profile/me");

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
            const res = await axios.get("/api/profile");

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
            const res = await axios.get(`/api/profile/user/${userId}`);

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
                `/api/profile/github/${githubUsername}`
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
            const res = await axios.post("/api/profile", formData, {
                headers: { "Content-Type": "application/json" },
            });

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
                `/api/profile/follow/${userToFollowId}`
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
                `/api/profile/unfollow/${userToUnfollowId}`
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
};
