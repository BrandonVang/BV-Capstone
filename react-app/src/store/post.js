import { thunkDeleteMedia } from "./media";

// Constants
const SET_ALL_POSTS = "posts/SET_POSTS";
const ADD_POST = "posts/ADD_POST";
const REMOVE_POST = "posts/REMOVE_POST";
const SET_POST = "posts/SET_POST";
const UPDATE_POST = "posts/UPDATE_POST";
const SET_CURRENT_POSTS = "posts/SET_CURRENT_POSTS";
const SET_FOLLOWING_POSTS = "posts/SET_FOLLOWING_POSTS";

// Action Creators
const setPosts = (posts) => ({
    type: SET_ALL_POSTS,
    posts,
});

const setPost = (post) => ({
    type: SET_POST,
    post,
});

const setCurrentPosts = (posts) => ({
    type: SET_CURRENT_POSTS,
    posts,
});

const setFollowingPosts = (posts) => ({
    type: SET_FOLLOWING_POSTS,
    posts,
});

const addPost = (post) => ({
    type: ADD_POST,
    post,
});

const updatePostAction = (post) => ({
    type: UPDATE_POST,
    post,
});

const removePost = (postId) => ({
    type: REMOVE_POST,
    postId,
});

export const fetchAllPosts = () => async (dispatch) => {
    const response = await fetch("/api/posts/all");
    if (response.ok) {
        const { posts } = await response.json();
        dispatch(setPosts(posts));
    }
};

export const fetchCurrentPosts = () => async (dispatch) => {
    const response = await fetch("/api/posts/current");
    if (response.ok) {
        const { posts } = await response.json();
        return dispatch(setCurrentPosts(posts));
    }
};

export const fetchFollowingPosts = () => async (dispatch) => {
    const response = await fetch("/api/posts/community");
    if (response.ok) {
        const { posts } = await response.json();
        dispatch(setFollowingPosts(posts));
    }
};

export const fetchPostByCommunity = (community_id) => async (dispatch) => {
    const response = await fetch(`/api/posts/community/${community_id}`);
    if (response.ok) {
        const { post } = await response.json()
        dispatch(setPost(post))
        return post
    }
}

export const fetchPostById = (postId) => async (dispatch) => {
    const response = await fetch(`/api/posts/${postId}`);
    if (response.ok) {
        const { post } = await response.json();
        dispatch(setPost(post));
        return post;
    }
};

export const thunkCreatePost = (postData) => async (dispatch) => {
    try {
        const response = await fetch("/api/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(postData), // Send the entire postData object as JSON
        });

        if (!response.ok) {
            throw new Error("Failed to create the post.");
        }

        const data = await response.json();
        console.log("This is post from thunkCreate", data);
        dispatch(addPost(data.posts));
        return data.posts;
    } catch (error) {
        console.error("Error creating post:", error);
        throw error; // Re-throw the error to be handled in the component
    }
};


export const thunkEditPost = (id, updatedData) => async (dispatch) => {
    try {
        const response = await fetch(`/api/posts/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedData),
        });

        if (!response.ok) {
            throw new Error("Failed to update the post.");
        }

        const { updatedPost } = await response.json();
        dispatch(updatePostAction(updatedPost));
    } catch (error) {
        console.error("Error updating post:", error);
        throw error; // Re-throw the error to be handled in the component
    }

};

export const thunkDeletePostById = (post) => async (dispatch) => {
    const promiseAll = []
    post.medias.forEach(async media => {
        const pro = fetch(`/api/medias/${media.id}`, {
            method: "DELETE",
        });
        promiseAll.push(pro);
    });
    await Promise.all(promiseAll);

    const response = await fetch(`/api/posts/${post.id}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error("Failed to delete the post.");
    }
    // dispatch(thunkDeleteMedia(postId));
    dispatch(removePost(post.id));
};

const initialState = {
    allPosts: {},
    currentPosts: {},
    singlePost: {},
    userCommunities: {}
};

// selectors
export const getPost = (state) => Object.values(state.posts.allPosts);

export const getCurrentPosts = (state) =>
    Object.values(state.posts.currentPosts);

export const getJoinedCommunitiesPosts = (state) =>
    Object.values(state.posts.userCommunities);

export const getOnePost = (spotId) => (state) => state.posts.singlePost;

export default function postsReducer(state = initialState, action) {
    switch (action.type) {
        case SET_ALL_POSTS:
            let postState = { ...state, allPosts: {} };
            action.posts.forEach((post) => {
                postState.allPosts[post.id] = post;
            });
            return postState;
        case SET_POST:
            return {
                ...state,
                singlePost: { ...state.singlePost, [action.post.id]: action.post },
            };
        case SET_CURRENT_POSTS:
            let currentPostsState = { ...state, currentPosts: {} };
            action.posts.forEach((post) => {
                currentPostsState[post.id] = post;
            });
            return {
                ...state,
                currentPosts: currentPostsState,
            };
        case SET_FOLLOWING_POSTS:
            let followingPostsState = { ...state, followingPosts: {} };
            action.posts.forEach((post) => {
                followingPostsState.followingPosts[post.id] = post;
            });
            return followingPostsState;
        case ADD_POST:
            return {
                ...state,
                allPosts: {
                    ...state.allPosts,
                    [action.post.id]: action.post,
                },
            };
        case UPDATE_POST:
            const updatedPost =
                state.singlePost.id === action.post.id ? action.post : state.singlePost;
            return {
                ...state,
                allPosts: { ...state.allPosts, [action.post.id]: action.post },
                singlePost: updatedPost,
            };
        case REMOVE_POST:
            const newState = { ...state.allPosts };
            delete newState[action.postId];
            return { ...state, allPosts: newState };
        default:
            return state;
    }
}
