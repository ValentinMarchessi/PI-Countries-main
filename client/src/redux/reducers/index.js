const initialState = {
	countries: [],
	continents: [],
	activities: [],
    pages: [],
    page: {},
	filter: {type: '', value: ''},
	order: { by: '', direction: '' },
};

export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case 'LOAD_PAGES':
            return {
                ...state,
                pages: action.payload,
            }
        case 'LOAD_PAGE': {
            return {
                ...state,
                page: action.payload
            }
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
        case 'LOAD_CONTINENTS':
            return {
                ...state,
                continents: action.payload
            }
        case 'SET_ORDER':
            return {
                ...state,
                order: action.payload
            }
        case 'SET_FILTER':
            return {
                ...state,
                filter: action.payload
            }
        default:
            return state;
    }
}