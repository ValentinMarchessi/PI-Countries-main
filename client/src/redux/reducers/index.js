const initialState = {
	countries: [],
	continents: [],
	activities: [],
    page: {
        current: {},
        filter: {type: '', value: ''},
        order: { by: 'name', direction: 'DESC' },
    },
    index: 1,
};

export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case 'LOAD_PAGE': {
            return {
				...state,
				page: {
					...state.page,
					current: action.payload,
				},
			};
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
                page: {
                    ...state.page,
                    order: action.payload
                }
            }
        case 'SET_FILTER':
            return {
                ...state,
                page: {
                    ...state.page,
                    filter: action.payload
                }
            }
        case 'SET_INDEX':
            return {
                ...state,
                index: action.payload
            }
        default:
            return state;
    }
}