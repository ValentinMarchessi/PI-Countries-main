const initialState = {
    countries: [],
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
        default:
            return state;
    }
}