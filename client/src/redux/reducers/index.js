const initialState = {
    pages: [],
    filterOptions: {
        continent: '',
        activity: '',
        order: {
            ascending: true,
            by: 'name',
        }
    }
};

export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case 'LOAD_PAGES':
            return {
                ...state,
                pages: action.payload,
            }
        default:
            return state;
    }
}