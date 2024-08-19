// src/redux/reducers/exampleReducer.js
const initialState = {
    data: [],
    error: null,
};

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_DATA_SUCCESS':
            return {
                ...state,
                data: action.payload,
                error: null,
            };
        case 'FETCH_DATA_FAILURE':
            return {
                ...state,
                error: action.payload,
            };
        default:
            return state;
    }
};

