
const initialState = {
    loading: false,
    data: null,
    error: null
};

export const userProfileReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_USER_PROFILE':
            return { ...state, loading: true };
        case 'FETCH_USER_PROFILE_SUCCESS':
            return { ...state, loading: false, data: action.payload };
        case 'FETCH_USER_PROFILE_FAILURE':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};
