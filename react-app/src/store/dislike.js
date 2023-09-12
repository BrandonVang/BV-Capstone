// Constants
const SET_POST_DISLIKES = "dislikes/SET_POST_DISLIKES";
const SET_USER_DISLIKES = "dislikes/SET_USER_DISLIKES";
const ADD_DISLIKE = "dislikes/ADD_DISLIKE";
const REMOVE_DISLIKE = "dislikes/REMOVE_DISLIKE";

// Action Creators
const setPostDisLikes = (dislikes) => ({
    type: SET_POST_DISLIKES,
    dislikes,
});

const setUserDisLikes = (dislikes) => ({
    type: SET_USER_DISLIKES,
    dislikes,
});

const addDisLike = (dislike) => ({
    type: ADD_DISLIKE,
    dislike,
});

const removeDisLike = (dislikeId) => ({
    type: REMOVE_DISLIKE,
    dislikeId,
});

export const fetchPostDisLikes = (postId) => async (dispatch) => {
    const response = await fetch(`/api/dislikes/${postId}`);
    if (response.ok) {
        const { dislikes } = await response.json();
        dispatch(setPostDisLikes(dislikes));
    } else {
        throw new Error('Failed to fetch post likes.');
    }
};

export const fetchUserDisLikes = (userId) => async (dispatch) => {
    const response = await fetch(`/api/dislikes/users/${userId}`);
    if (response.ok) {
        const { dislikes } = await response.json();
        dispatch(setUserDisLikes(dislikes));
    } else {
        throw new Error('Failed to fetch user likes.');
    }
};

export const thunkAddDisLike = (postId) => async (dispatch) => {
    const response = await fetch(`/api/dislikes/${postId}/dislikes`, { method: "POST" });
    if (response.ok) {
        const dislike = await response.json();
        dispatch(addDisLike(dislike));
        return dislike
    } else {
        throw new Error('Failed to add dislike.');
    }
};

export const thunkRemoveDisLike = (dislikeId) => async (dispatch) => {
    const response = await fetch(`/api/dislikes/${dislikeId}`, { method: "DELETE" });
    if (response.ok) {
        dispatch(removeDisLike(dislikeId));
    } else {
        throw new Error('Failed to remove dislike.');
    }
};
const initialState = {
    postDisLikes: [],
    userDisLikes: [],
};

export default function dislikesReducer(state = initialState, action) {
    switch (action.type) {
        case SET_POST_DISLIKES:
            return {
                ...state,
                postDisLikes: action.dislikes
            };
        case SET_USER_DISLIKES:
            return {

                ...state,
                userDisLikes: action.dislikes
            };
        case ADD_DISLIKE:
            return {
                ...state,
                postDisLikes: [...state.postDisLikes, action.dislike],
                userDisLikes: [...state.userDisLikes, action.dislike],
            };
        case REMOVE_DISLIKE:
            return {
                ...state,
                postDisLikes: state.postDisLikes.filter((dislike) => dislike.id !== action.dislikeId),
                userDisLikes: state.userDisLikes.filter((dislike) => dislike.id !== action.dislikeId),
            };
        default:
            return state;
    }
}
