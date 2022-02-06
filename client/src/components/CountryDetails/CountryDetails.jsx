import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import style from './CountryDetails.module.scss';

import Details from './Details/Details';
import Activities from './Activities/Activities';

export default function CountryDetails() {
    const [country, setCountry] = useState({
        name: '',
        id: '',
        continent: '',
        subregion: '',
        flag: '',
        capital: '',
        population: 0,
        area: 0,
        activities: [],
    });

    const [loading, isLoading] = useState(true);
    const { id } = useParams();
    
    useEffect(() => {
        (async function () {
            await axios.get(`http://localhost:3001/countries/${id}`).then(({ data }) => {
                setCountry(data);
            })
            isLoading(false);
        })();

    },[id])


    return !loading ? (
        <div className={style.container}>
            <Details country={country}/>
            <Activities activities={country.activities}/>
		</div>
	) : (
		<div className='loader'></div>
	);
}