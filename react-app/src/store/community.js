const SET_LOGGED_IN_USER_COMMUNITIES = 'communities/SET_LOGGED_IN_USER_COMMUNITIES'
const SET_ADD_COMMUNITIES = 'communities/SET_ADD_COMMUNITIES'
const SET_ALL_COMMUNITIES = 'communities/SET_ALL_COMMUNITIES'
const SET_REMOVE_COMMUNITIES = 'communities/SET_REMOVE_COMMUNITIES'

const setAllCommunities = (community) => ({
    type: SET_ALL_COMMUNITIES,
    community,
})

const setLoggiedInUserCommunities = (community) => ({
    type: SET_LOGGED_IN_USER_COMMUNITIES,
    community,
})

const setAddCommunities = (community) => ({
    type: SET_ADD_COMMUNITIES,
    community
})

const setRemoveCommunities = (community) => ({
    type: SET_REMOVE_COMMUNITIES,
    community
})

export const fetchAllCommunities = () => async (dispatch) => {
    const response = await fetch(`/api/community/`)
    if (response.ok) {
        const community = await response.json()
        console.log("test", community)
        dispatch(setAllCommunities(community))
    }
}

export const fetchLoggiedInUserCommunities = () => async (dispatch) => {
    const response = await fetch(`/api/community/joined`);
    if (response.ok) {
        const community = await response.json()
        dispatch(setLoggiedInUserCommunities(community))
    } else {
        throw new Error(
            "Failed to fetch the users communities"
        )
    }
}


export const fetchAddCommunities = (community_id) => async (dispatch) => {
    const response = await fetch(`/api/community/${community_id}`, { method: "POST" })
    const data = await response.json()

    if (response.ok) {
        console.log(data.res)
        dispatch(fetchLoggiedInUserCommunities())
    } else {
        throw new Error("Failed to join community");
    }
}

export const fetchRemoveCommunities = (community_id) => async (dispatch) => {
    const response = await fetch(`/api/community/${community_id}`, { method: "DELETE" })
    const data = await response.json()

    if (response.ok) {
        console.log(data.res)
        dispatch(fetchLoggiedInUserCommunities())
    } else {
        throw new Error(data.error || "Failed to leave community")
    }
}


const initialState = {
    allCommunity: {},
    userCommunities: {}
}

export default function communityReducer(state = initialState, action) {
    switch (action.type) {
        case SET_ALL_COMMUNITIES:
            let comState = { ...state, allCommunity: {} }
            action.community.forEach((communities) => {
                comState.allCommunity[communities.id] = communities
            })
            return comState
        case SET_LOGGED_IN_USER_COMMUNITIES:
            return {
                ...state,
                userCommunities: action.community
            }
        case SET_ADD_COMMUNITIES:
            return {
                ...state,
                userCommunities: [...state.userCommunities, action.community],
            };
        case SET_REMOVE_COMMUNITIES:
            const newCommunities = state.communities.filter(community => community.id !== action.community.id);
            const newUserCommunities = state.userCommunities.filter(community => community.id !== action.community.id);
            return {
                ...state,
                allCommunity: newCommunities,
                userCommunities: newUserCommunities,
            };

        default:
            return state

    }
}
