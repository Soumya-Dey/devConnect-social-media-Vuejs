import axios from "axios";

const state = {
    post: {
        post: null,
        posts: [],
        loading: true,
        error: {},
    },
};

const getters = {
    currentPost: (state) => state.post.post,
    allPosts: (state) => state.post.posts,
    postsLoadingStatus: (state) => state.post.loading,
    postsError: (state) => state.post.error,
};

const actions = {
    async getAllPosts({ commit }) {
        try {
            // get all posts
            const res = await axios.get("http://localhost:5000/api/posts");

            commit("GET_POSTS", res.data);
            // try this if the other version creates problems
            // setTimeout(() => {
            //     commit("GET_POSTS",res.data);
            // }, 500);
        } catch (error) {
            // send the error data to reducer
            commit("POSTS_ERROR", {
                msg: error.response.statusText,
                status: error.response.status,
            });
        }
    },
    async getAllPostsByUser({ commit }, { userId }) {
        try {
            // get all posts
            const res = await axios.get(
                `http://localhost:5000/api/posts/user/${userId}`
            );

            commit("GET_POSTS", res.data);
            // try this if the other version creates problems
            // setTimeout(() => {
            //     commit("GET_POSTS",res.data);
            // }, 500);
        } catch (error) {
            // send the error data to reducer
            commit("POSTS_ERROR", {
                msg: error.response.statusText,
                status: error.response.status,
            });
        }
    },
    async getPost({ commit }, { postId }) {
        try {
            // get the post by id
            const res = await axios.get(
                `http://localhost:5000/api/posts/${postId}`
            );

            commit("GET_POST", res.data);
            // try this if the other version creates problems
            // setTimeout(() => {
            //     commit("GET_POST",res.data);
            // }, 500);
        } catch (error) {
            // send the error data to reducer
            commit("POSTS_ERROR", {
                msg: error.response.statusText,
                status: error.response.status,
            });
        }
    },
    async addLike({ commit }, { postId }) {
        try {
            // add the like
            const res = await axios.put(
                `http://localhost:5000/api/posts/like/${postId}`
            );

            // send the likes array to reducer
            commit("UPDATE_LIKES", { postId: postId, likes: res.data });
        } catch (error) {
            // send the error data to reducer
            commit("POSTS_ERROR", {
                msg: error.response.statusText,
                status: error.response.status,
            });
        }
    },
    async removeLike({ commit }, { postId }) {
        try {
            // remove the like
            const res = await axios.put(
                `http://localhost:5000/api/posts/unlike/${postId}`
            );

            // send the likes array to reducer
            commit("UPDATE_LIKES", { postId: postId, likes: res.data });
        } catch (error) {
            // send the error data to reducer
            commit("POSTS_ERROR", {
                msg: error.response.statusText,
                status: error.response.status,
            });
        }
    },
    async addDislike({ commit }, { postId }) {
        try {
            // add the dislike
            const res = await axios.put(
                `http://localhost:5000/api/posts/dislike/${postId}`
            );

            // send the dislikes array to reducer
            commit("UPDATE_DISLIKES", { postId: postId, dislikes: res.data });
        } catch (error) {
            // send the error data to reducer
            commit("POSTS_ERROR", {
                msg: error.response.statusText,
                status: error.response.status,
            });
        }
    },
    async removeDislike({ commit }, { postId }) {
        try {
            // remove the dislike
            const res = await axios.put(
                `http://localhost:5000/api/posts/undislike/${postId}`
            );

            // send the dislikes array to reducer
            commit("UPDATE_DISLIKES", { postId: postId, dislikes: res.data });
        } catch (error) {
            // send the error data to reducer
            commit("POSTS_ERROR", {
                msg: error.response.statusText,
                status: error.response.status,
            });
        }
    },
    async addPost({ commit, dispatch }, { formData }) {
        try {
            // add the post
            const res = await axios.post(
                "http://localhost:5000/api/posts",
                formData,
                {
                    headers: { "Content-Type": "application/json" },
                }
            );

            // send the new post to reducer
            commit("ADD_POST", res.data);

            // show an alert
            dispatch("setAlert", {
                msg: "Post added successfully",
                alertType: "success",
            });
        } catch (error) {
            // send the error data to reducer
            commit("POSTS_ERROR", {
                msg: error.response.statusText,
                status: error.response.status,
            });
        }
    },
    async deletePost({ commit, dispatch }, { postId }) {
        if (window.confirm("Are you sure you want to remove your post?")) {
            try {
                // remove the post
                await axios.delete(`http://localhost:5000/api/posts/${postId}`);

                // send the deleted post id to reducer
                commit("DELETE_POST", { postId });

                // show an alert
                dispatch("setAlert", {
                    msg: "Post removed successfully",
                    alertType: "dark",
                });
            } catch (error) {
                // send the error data to reducer
                commit("POSTS_ERROR", {
                    msg: error.response.statusText,
                    status: error.response.status,
                });
            }
        }
    },
    async addComment({ commit, dispatch }, { postId, formData }) {
        try {
            // add the commet
            const res = await axios.post(
                `http://localhost:5000/api/posts/comment/${postId}`,
                formData,
                {
                    headers: { "Content-Type": "application/json" },
                }
            );

            // send the new comment data to reducer
            commit("UPDATE_COMMENTS", res.data);

            // show an alert
            dispatch("setAlert", {
                msg: "Comment added successfully",
                alertType: "success",
            });
        } catch (error) {
            // send the error data to reducer
            commit("POSTS_ERROR", {
                msg: error.response.statusText,
                status: error.response.status,
            });
        }
    },
    async deleteComment({ commit, dispatch }, { postId, commentId }) {
        if (window.confirm("Are you sure you want to remove your comment?")) {
            try {
                // add the commet
                const res = await axios.delete(
                    `http://localhost:5000/api/posts/comment/${postId}/${commentId}`
                );

                // send the new comment data to reducer
                commit("UPDATE_COMMENTS", res.data);

                // show an alert
                dispatch("setAlert", {
                    msg: "Comment removed successfully",
                    alertType: "dark",
                });
            } catch (error) {
                // send the error data to reducer
                commit("POSTS_ERROR", {
                    msg: error.response.statusText,
                    status: error.response.status,
                });
            }
        }
    },
};

const mutations = {
    GET_POSTS: (state, payload) => {
        state.post = {
            ...state.post,
            posts: payload,
            loading: false,
        };
    },
    GET_POST: (state, payload) => {
        state.post = {
            ...state.post,
            post: payload,
            loading: false,
        };
    },
    ADD_POST: (state, payload) => {
        state.post = {
            ...state.post,
            posts: [payload, ...state.post.posts],
            loading: false,
        };
    },
    DELETE_POST: (state, payload) => {
        state.post = {
            ...state.post,
            posts: state.post.posts.filter((p) => p._id !== payload.postId),
            loading: false,
        };
    },
    UPDATE_LIKES: (state, payload) => {
        state.post = {
            ...state.post,
            posts: state.post.posts.map((p) =>
                p._id === payload.postId ? { ...p, likes: payload.likes } : p
            ),
            loading: false,
        };
    },
    UPDATE_DISLIKES: (state, payload) => {
        state.post = {
            ...state.post,
            posts: state.post.posts.map((p) =>
                p._id === payload.postId
                    ? { ...p, dislikes: payload.dislikes }
                    : p
            ),
            loading: false,
        };
    },
    UPDATE_COMMENTS: (state, payload) => {
        state.post = {
            ...state.post,
            post: { ...state.post.post, comments: payload },
            loading: false,
        };
    },
    POSTS_ERROR: (state, payload) => {
        state.post = {
            ...state.post,
            error: payload,
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
