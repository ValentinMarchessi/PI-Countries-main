const axios = require('axios');

export function loadPages({order, filter}) {
    const entries_per_page = 10;
    return async function (dispatch) {
        try {
            let pages = [];
            const max_index = await axios.get('http://localhost:3001/countries').then(({ data }) => data.length);
            const { type, value } = filter;
            let query = `?orderBy=${order.by}&direction=${order.direction}`;
            if (type && value) query += `&filter=${type}&filterValue=${value}`;
            for (let i = 1; i * entries_per_page <= max_index; i++) {
                let { data } = await axios.get(`http://localhost:3001/countries${query}&page=${i}`);
                if (data.length) pages.push(data);
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

export function loadContinents() {
    return async function (dispatch) {
        try {
            const continents = await axios.get('http://localhost:3001/countries/continents/').then(({ data }) => data);
            dispatch({ type: 'LOAD_CONTINENTS', payload: continents });
        }
        catch (error) {
            console.error(error);
        }
    }
}