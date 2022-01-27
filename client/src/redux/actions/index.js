const axios = require('axios');

export function loadPages({orderBy, direction}) {
    const entries_per_page = 10;
    return async function (dispatch) {
        try {
            let pages = [];
            const max_index = await axios.get('http://localhost:3001/countries').then(({ data }) => data.length);
            for (let i = 1; i * entries_per_page <= max_index; i++) {
                let { data } = await axios.get(`http://localhost:3001/countries?page=${i}&orderBy=${orderBy}&direction=${direction}`);
                pages.push(data);
            }
            dispatch({type: 'LOAD_PAGES', payload: pages});     
        }
        catch (error) {
            console.error(error);
        }
    }
}

export function loadCountries() {
    return async function (dispatch) {
        try {
            const countries = await axios.get(`http://localhost:3001/countries`).then(({ data }) => data);
            dispatch({type: 'LOAD_COUNTRIES', payload: countries});
        }
        catch (error) {
            console.error(error);
        }
    }
}

export function loadActivities() {
    return async function (dispatch) {
        try {
            const activities = await axios.get(`http://localhost:3001/activity`).then(({ data }) => data);
            dispatch({ type: 'LOAD_ACTIVITIES', payload: activities });
        }
        catch (error) {
            console.error(error);
        }
    }
}