const axios = require('axios');

export function loadPage(index, {order, filter}) {
    return async function (dispatch) {
        try {
            let query = `?page=${index}`;
            if (order.by && order.direction) query += `&orderBy=${order.by}&direction=${order.direction}`;
            if (filter.type && filter.value) query += `&filter=${filter.type}&filterValue=${filter.value}`;
            const page = await axios.get(`http://localhost:3001/countries${query}`).then(({data}) => data);
            dispatch({ type: "LOAD_PAGE", payload: page });
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