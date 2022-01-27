import CountryCard from '../CountryCard/CountryCard.jsx';
import style from './CardContainer.module.css';
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadPages } from '../../redux/actions';

export default function CardContainer() {
    const [page, setPage] = useState([]);
    const [index, setIndex] = useState(1); /* page index */
    const [options, setOptions] = useState({
		orderBy: 'name', //name
		direction: 'DESC',       //descending
	});

    const dispatch = useDispatch();
    const pages = useSelector(store => store.pages);

    useEffect(() => {
        dispatch(loadPages(options));
    }, [dispatch, options])
    
    useEffect(() => {
        if(pages[index - 1]) setPage(pages[index - 1].map(country => 
            <CountryCard
                key={country.id}
                id={country.id}
                name={country.name}
                flag={country.flag}
                continent={country.continent}
            />
        ))
    }, [index, setPage, pages])
    
    function handlePageNav(event) {
        const { name } = event.target;
        if (name === 'incrementPage' && index < pages.length) setIndex(index + 1);
        if (name === 'decrementPage' && index > 1) setIndex(index - 1);
    }

    function handleOptions(event){
        event.preventDefault();
        const { name } = event.target;
        console.log(event);
        switch (name) {
            case "orderBy":
                setOptions({ ...options, orderBy: options.orderBy === 'name' ? 'population' : 'name' });
                break;
            case "direction":
                setOptions({ ...options, direction: options.direction === 'DESC' ? 'ASC' : 'DESC' });
                break
            default:
                return new Error();
        }
    }

    function handleFilter(event) {
        
    }

    return (
		<div className={style.main}>
			<div className={style.options}>
				<button onClick={handleOptions} name="orderBy" className="material-icons">
					{options.orderBy === 'name' ? 'sort_by_alpha' : 'group'}
				</button>
				<button onClick={handleOptions} name="direction" className="material-icons">
					{options.direction === 'DESC' ? 'south' : 'north'}
				</button>
				<button onClick={handleFilter} name="filter" className="material-icons">
                    filter_list
				</button>
			</div>
			{page.length ? <div className={style.cardContainer}>{page}</div> : <div className="loader"></div>}
			<div className={style.navigation}>
				<button name="decrementPage" onClick={handlePageNav}>
					Previous
				</button>
				<h1>{index}</h1>
				<button name="incrementPage" onClick={handlePageNav}>
					Next
				</button>
			</div>
		</div>
	);
}