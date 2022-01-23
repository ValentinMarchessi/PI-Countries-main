import CountryCard from '../CountryCard/CountryCard.jsx';
import style from './CardContainer.module.css';
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadPages } from '../../redux/actions';

export default function CardContainer() {
    const [page, setPage] = useState([]);
    const [index, setIndex] = useState(1); /* page index */

    const dispatch = useDispatch();
    const pages = useSelector(store => store.pages);

    useEffect(() => {
        dispatch(loadPages());
    }, [dispatch])
    
    useEffect(() => {
        if(pages[index]) setPage(pages[index - 1].map(country => 
            <CountryCard
                key={country.id}
                id={country.id}
                name={country.name}
                flag={country.flag}
                continent={country.continent}
            />
        ))
    },[index,setPage,pages])

    function handlePageNav(event) {
        const { name } = event.target;
        if (name === 'incrementPage' && index < pages.length) setIndex(index + 1);
        if (name === 'decrementPage' && index > 1) setIndex(index - 1);
    }

    //console.log(page, pages);

    return (
        <div className={style.main}>
            <div className={style.cardContainer}>
                {page.length ? page : <div>Loading</div>}
            </div>
            <div className={style.navigation}>
                <button name='decrementPage' onClick={handlePageNav}>Previous</button>
                <h1>{index}</h1>
                <button name='incrementPage' onClick={handlePageNav}>Next</button>
            </div>
        </div>
    )
}