const axios = require('axios');

export function loadPages() {
    const entries_per_page = 10;
    return async function (dispatch) {
        try {
            let pages = [];
            const max_index = await axios.get('http://localhost:3001/countries').then(({ data }) => data.length);
            for (let i = 1; i * entries_per_page <= max_index; i++) {
                let { data } = await axios.get(`http://localhost:3001/countries?page=${i}`);
                pages.push(data);
            }
            dispatch({type: 'LOAD_PAGES', payload: pages});     
        }
        catch (error) {
            console.log(error);
        }
    }
}