import CountryCard from '../CountryCard/CountryCard.jsx';
import style from './CardContainer.module.css';
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadPages, loadActivities, loadContinents } from '../../redux/actions';

function SearchOptions() {
	const [order, setOrder] = useState({
		by: 'name',
		direction: 'DESC',
	});
	const [filterMenuIsActive, setFilterMenuIsActive] = useState(false);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch({ type: 'SET_ORDER', payload: order });
	}, [order, dispatch]);

	function handleOptions(event) {
		const { name } = event.target;
		if (name === 'by') setOrder({ ...order, by: order.by === 'name' ? 'population' : 'name' });
		if (name === 'direction') setOrder({ ...order, direction: order.direction === 'DESC' ? 'ASC' : 'DESC' });
	}

	function toggleFilterMenu() {
		filterMenuIsActive ? setFilterMenuIsActive(false) : setFilterMenuIsActive(true);
	}

	return (
		<div>
			<div className={style.options}>
				<button onClick={handleOptions} name="by" className="material-icons">
					{order.by === 'name' ? 'sort_by_alpha' : 'group'}
				</button>
				<button onClick={handleOptions} name="direction" className="material-icons">
					{order.direction === 'DESC' ? 'south' : 'north'}
				</button>
				<button onClick={toggleFilterMenu} name="filter" className="material-icons">
					filter_list
				</button>
			</div>
			{filterMenuIsActive ? <FilterMenu /> : null}
		</div>
	);
}

function FilterMenu() {
	const continents = useSelector((store) => store.continents).map((continent) => (
					<button className={style.optionPill} key={continent} onClick={handleOption} name="continent" value={continent}>
						{continent}
        </button>));
	const activities = useSelector((store) => store.activities).map((activity) => (
		<button className={style.optionPill} key={activity.id} onClick={handleOption} name="activity" value={activity.name}>
			{activity.name}
		</button>
	));
	const [options, setOptions] = useState([]);
	const [selected, setSelected] = useState();
    const dispatch = useDispatch();
    const pillContainer = useRef();

    function handleOption(event) {
        const button = event.target;
        if (!button.classList.contains(style.selected)) {
            setSelected(button);
        } else {
            setSelected();
        }
	}

    useEffect(() => {
        if (pillContainer.current) {
            pillContainer.current.childNodes.forEach(button => {
                if (selected && button.value === selected.value) button.classList.add(style.selected);
                else button.classList.remove(style.selected);
            })
        }
        dispatch({
            type: 'SET_FILTER',
            payload: {
                type: selected ? selected.name : '',
                value: selected ? selected.value : '',
            },
        });

	}, [selected, dispatch, options]);

	function handleFilterMenu(event) {
		const { name } = event.target;
		if (name === 'activities') {
			setOptions(activities);
		}
		if (name === 'continents') {
			setOptions(continents);
		}
    }

	return (
		<div className={style.filterMenu}>
			<div className={style.filterOptions}>
				<button key="activity" onClick={handleFilterMenu} name="activities">
					Activities
				</button>
				<button key="continent" onClick={handleFilterMenu} name="continents">
					Continents
				</button>
			</div>
            <div ref={pillContainer} className={style.filterOptionsContainer}>{options.length ? options : <h2>No filters available.</h2>}</div>
		</div>
	);
}

function PageNav({ index, handlePageNav }) {
	return (
		<div className={style.navigation}>
			<button name="decrementPage" onClick={handlePageNav}>
				Previous
			</button>
			<h1>{index}</h1>
			<button name="incrementPage" onClick={handlePageNav}>
				Next
			</button>
		</div>
	);
}

export default function CardContainer() {
	const [page, setPage] = useState([]);
	const [index, setIndex] = useState(1); /* page index */

	const dispatch = useDispatch();
	const pages = useSelector((store) => store.pages);
	const filter = useSelector((store) => store.filter);
	const order = useSelector((store) => store.order);

	useEffect(() => {
		dispatch(loadPages({ order, filter }));
		dispatch(loadActivities());
		dispatch(loadContinents());
	}, [dispatch, order, filter]);

	useEffect(() => {
		if (pages[index - 1]) setPage(pages[index - 1].map((country) => <CountryCard key={country.id} id={country.id} name={country.name} flag={country.flag} continent={country.continent} />));
	}, [index, setPage, pages]);

	function handlePageNav(event) {
		const { name } = event.target;
		if (name === 'incrementPage' && index < pages.length) setIndex(index + 1);
		if (name === 'decrementPage' && index > 1) setIndex(index - 1);
	}

	return (
		<div className={style.main}>
			<SearchOptions />
			{page.length ? <div className={style.cardContainer}>{page}</div> : <div className="loader"></div>}
			<PageNav index={index} handlePageNav={handlePageNav} />
		</div>
	);
}
