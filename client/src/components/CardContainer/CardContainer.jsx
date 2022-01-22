import CountryCard from '../CountryCard/CountryCard.jsx';
import style from './CardContainer.module.css';
import axios from 'axios';
import { useState, useEffect, useRef } from 'react';

export default function CardContainer() {
    const [page, setPage] = useState([]);
    const [index, setIndex] = useState(1); /* page index */
    let max_index = useRef();

    useEffect(() => {
        async function getMaxIndex() {
            max_index.current = await axios(`http://localhost:3001/countries`).then(({data}) => data.length);
        };
        getMaxIndex();
    },[])

    useEffect(() => {
        axios(`http://localhost:3001/countries?page=${index}`)
            .then(({data}) => {
                setPage(data.map((country) => {
                    return <CountryCard
                        key={country.id}
                        name={country.name}
                        flag={country.flag}
                        continent={country.continent}
                    />
            }))
        })
    }, [index]);

    function incrementPage() {
        if((index + 1)*10 < max_index.current) setIndex(index + 1);
    }

    function decrementPage() {
        if (index > 1) setIndex(index - 1);    
    }

    return (
        <div className={style.main}>
            <div className={style.cardContainer}>
                {page}
            </div>
            <div className={style.navigation}>
                <button onClick={decrementPage}>Previous</button>
                <h1>{index}</h1>
                <button onClick={incrementPage}>Next</button>
            </div>
        </div>
    )
}