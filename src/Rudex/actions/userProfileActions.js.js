// Action Types
export const FETCH_USER_PROFILE = 'FETCH_USER_PROFILE';
export const FETCH_USER_PROFILE_SUCCESS = 'FETCH_USER_PROFILE_SUCCESS';
export const FETCH_USER_PROFILE_FAILURE = 'FETCH_USER_PROFILE_FAILURE';

// Action Creators
export const fetchUserProfile = () => ({
    type: FETCH_USER_PROFILE
});

export const fetchUserProfileSuccess = (userData) => ({
    type: FETCH_USER_PROFILE_SUCCESS,
    payload: userData
});

export const fetchUserProfileFailure = (error) => ({
    type: FETCH_USER_PROFILE_FAILURE,
    payload: error
});
