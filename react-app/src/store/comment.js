// Constants
const SET_COMMENTS = 'comments/SET_COMMENTS';
const ADD_COMMENT = 'comments/ADD_COMMENT';
const UPDATE_COMMENT = 'comments/UPDATE_COMMENT';
const DELETE_COMMENT = 'comments/DELETE_COMMENT';

// Action Creators
const setComments = (comments) => ({
    type: SET_COMMENTS,
    comments
});

const addComment = (comment) => ({
    type: ADD_COMMENT,
    comment
});

const updateComment = (comment) => ({
    type: UPDATE_COMMENT,
    comment
});

const deleteComment = (commentId) => ({
    type: DELETE_COMMENT,
    commentId
});


export const fetchCommentsByPost = (postId) => async (dispatch) => {
    const response = await fetch(`/api/comments/${postId}`);
    if (response.ok) {
        const comments = await response.json();
        dispatch(setComments(comments));
    } else {
        throw new Error("Failed to fetch comments.");
    }
};

export const thunkCreateComment = (postId, content) => async (dispatch) => {
    const response = await fetch(`/api/comments/${postId}/new`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(content)
    });
    if (response.ok) {
        const comment = await response.json();
        dispatch(addComment(comment));
    } else {
        const data = await response.json();
        throw new Error(data.error);
    }
};

export const thunkEditComment = (commentId, content) => async (dispatch) => {
    const response = await fetch(`/api/comments/${commentId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(content)
    });
    if (response.ok) {
        const comment = await response.json();
        dispatch(updateComment(comment));
    } else {
        const data = await response.json();
        throw new Error(data.error);
    }
};

export const thunkRemoveComment = (commentId) => async (dispatch) => {
    const response = await fetch(`/api/comments/${commentId}`, {
        method: "DELETE",
    });
    if (response.ok) {
        dispatch(deleteComment(commentId));
    } else {
        const data = await response.json();
        throw new Error(data.error);
    }
};

const initialState = {};

export default function commentsReducer(state = initialState, action) {
    switch (action.type) {
        case SET_COMMENTS: {
            const newState = { ...state };
            action.comments.forEach(comment => {
                newState[comment.id] = comment;
            });
            return newState;
        }
        case ADD_COMMENT: {
            return { ...state, [action.comment.id]: action.comment };
        }
        case UPDATE_COMMENT: {
            return { ...state, [action.comment.id]: action.comment };
        }
        case DELETE_COMMENT: {
            const newState = { ...state };
            delete newState[action.commentId];
            return newState;
        }
        default:
            return state;
    }
}
