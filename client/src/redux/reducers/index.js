const initialState = {
    countries: [],
    activities: [],
    pages: [],
};

export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case 'LOAD_PAGES':
            return {
                ...state,
                pages: action.payload,
            }
        case 'LOAD_COUNTRIES':
            return {
                ...state,
                countries: action.payload,
            }
        case 'LOAD_ACTIVITIES':
            return {
                ...state,
                activities: action.payload,
            }
        default:
            return state;
    }
}