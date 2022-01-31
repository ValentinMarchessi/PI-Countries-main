import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import style from './CountryDetails.module.css';

function ActivityCard({name,duration,difficulty,season}) {
    return (
        <div className={style.activityCard}>
            <h1>{name}</h1>
            <span>Duration: {duration} mins</span>
            <span>Difficulty: {difficulty}/5</span>
            <span>Season: {season}</span>
        </div>
    )
}

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
    const activityCards = country.activities.map(activity => {
        return <ActivityCard
            name={activity.name}
            duration={activity.duration}
            difficulty={activity.difficulty}
            season={activity.season} />
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
            <div className={style.infoContainer}>
                <div className={style.header}>
                    <h1>
                        {country.name} ({country.id})
                    </h1>
                    <h3>{country.continent}</h3>
                    <h4>{country.subregion}</h4>
                </div>
                <img src={country.flag} alt="flag"></img>
                <span>Capital: {country.capital}</span>
                <span>Population: {country.population}</span>
                <span>Area: {country.area}km2</span>
            </div>
            <div className={style.activities}>
                <h1>Activities</h1>
                <div className={style.activityCardsContainer}>
                    {activityCards.length ? activityCards : <h2>No activities available, sorry!</h2>}
                </div>
            </div>
		</div>
	) : (
		<div className='loader'></div>
	);
}