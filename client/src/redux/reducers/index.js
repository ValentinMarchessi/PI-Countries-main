const initialState = {
    currPage: [],
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
    switch (action.name) {
        default:
            return state;
    }
}