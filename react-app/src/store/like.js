// Constants
const SET_POST_LIKES = "likes/SET_POST_LIKES";
const SET_USER_LIKES = "likes/SET_USER_LIKES";
const ADD_LIKE = "likes/ADD_LIKE";
const REMOVE_LIKE = "likes/REMOVE_LIKE";

// Action Creators
const setPostLikes = (likes) => ({
    type: SET_POST_LIKES,
    likes,
});

const setUserLikes = (likes) => ({
    type: SET_USER_LIKES,
    likes,
});

const addLike = (like) => ({
    type: ADD_LIKE,
    like,
});

const removeLike = (likeId) => ({
    type: REMOVE_LIKE,
    likeId,
});

export const fetchPostLikes = (postId) => async (dispatch) => {
    const response = await fetch(`/api/likes/${postId}`);
    if (response.ok) {
        const { likes } = await response.json();
        dispatch(setPostLikes(likes));
    } else {
        throw new Error('Failed to fetch post likes.');
    }
};

export const fetchUserLikes = (userId) => async (dispatch) => {
    const response = await fetch(`/api/likes/users/${userId}`);
    if (response.ok) {
        const { likes } = await response.json();
        dispatch(setUserLikes(likes));
    } else {
        throw new Error('Failed to fetch user likes.');
    }
};

export const thunkAddLike = (postId) => async (dispatch) => {
    const response = await fetch(`/api/likes/${postId}/likes`, { method: "POST" });
    if (response.ok) {
        const like = await response.json();
        dispatch(addLike(like));
        return like
    } else {
        throw new Error('Failed to add like.');
    }
};

export const thunkRemoveLike = (likeId) => async (dispatch) => {
    const response = await fetch(`/api/likes/${likeId}`, { method: "DELETE" });
    if (response.ok) {
        dispatch(removeLike(likeId));
    } else {
        throw new Error('Failed to remove like.');
    }
};
const initialState = {
    postLikes: [],
    userLikes: [],
};

export default function likesReducer(state = initialState, action) {
    switch (action.type) {
        case SET_POST_LIKES:
            return {
                ...state,
                postLikes: action.likes
            };
        case SET_USER_LIKES:
            return {

                ...state,
                userLikes: action.likes
            };
        case ADD_LIKE:
            return {
                ...state,
                postLikes: [...state.postLikes, action.like],
                userLikes: [...state.userLikes, action.like],
            };
        case REMOVE_LIKE:
            return {
                ...state,
                postLikes: state.postLikes.filter((like) => like.id !== action.likeId),
                userLikes: state.userLikes.filter((like) => like.id !== action.likeId),
            };
        default:
            return state;
    }
}
