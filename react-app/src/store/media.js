// Constants
export const ADD_MEDIA = "ADD_MEDIA";
export const DELETE_MEDIA = "DELETE_MEDIA";

// Action Creators
export const addMediaAction = (media) => ({
    type: ADD_MEDIA,
    payload: media
});

export const deleteMediaAction = (mediaId) => ({
    type: DELETE_MEDIA,
    payload: mediaId
});


export const thunkAddMediaToPost = (postId, mediaFile) => async (dispatch) => {
    const formData = new FormData();
    formData.append('media_file', mediaFile);

    try {
        const response = await fetch(`/api/posts/${postId}/medias`, {
            method: "POST",
            body: formData
        });

        if (!response.ok) {
            throw new Error("Failed to add media to post.");
        }

        const data = await response.json();
        dispatch(addMediaAction(data.Media));
    } catch (error) {
        console.error(error);
    }
};

export const thunkDeleteMedia = (mediaId) => async (dispatch) => {
    try {
        const response = await fetch(`/api/medias/${mediaId}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            throw new Error("Failed to delete media.");
        }

        dispatch(deleteMediaAction(mediaId));
    } catch (error) {
        console.error(error);
    }
};
const initialState = {};

export default function mediaReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_MEDIA:
            return {
                ...state,
                [action.payload.id]: action.payload
            };
        case DELETE_MEDIA:
            if (!state[action.payload]) {
                return state;
            }
            const { [action.payload]: deletedMedia, ...remainingMedia } = state;
            return remainingMedia;
        default:
            return state;
    }
};
