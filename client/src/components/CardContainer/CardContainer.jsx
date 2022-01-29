import CountryCard from '../CountryCard/CountryCard.jsx';
import style from './CardContainer.module.css';
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadPage, loadActivities, loadContinents } from '../../redux/actions';

function ButtonSelect({ options, handler }) {
	const [selected, setSelected] = useState('');
	const [buttons, setButtons] = useState([]);

	useEffect(() => {
		function handleButton(event) {
			const value = event.target.value;
			selected !== value ? setSelected(value) : setSelected('');
			selected !== value ? handler(value) : handler('');
		}
		
		if(options) setButtons(
			options.map((option) => {
				return (
					<button className={`${option === selected ? `${style.selected}` : ''}`} key={option} value={option} onClick={handleButton}>
						{option}
					</button>
				);
			})
		);
	}, [selected, setButtons, options, handler]);

	return (options && options.length) ?
		<div className={style.buttonSelect}>{buttons}</div> :
		<h1 id={style.optionError}>No options available.</h1>;
}

function FilterMenu() {
	const dispatch = useDispatch();
	const activities = useSelector((store) => store.activities).map(activity => activity.name);
	const continents = useSelector((store) => store.continents);
	const [selected, setSelected] = useState({
		parameter: '',
		option: '',
	});

	useEffect(() => {
		if (selected.option) {
			dispatch({
				type: 'SET_FILTER',
				payload: {
					type: selected.parameter,
					value: selected.option,
				},
			});
		} else {
			dispatch({
				type: 'SET_FILTER',
				payload: {
					type: '',
					value: '',
				},
			});
		}
	}, [selected, dispatch]);

	useEffect(() => {
		dispatch(loadActivities());
		dispatch(loadContinents());
	}, [dispatch]);

	function handleParameter(value) {
		if (!value) setSelected({ parameter: '', option: '' });
		else
			setSelected({
				...selected,
				parameter: value,
			});
	}

	function handleOption(value) {
		setSelected({
			...selected,
			option: value,
		});
	}

	return (
		<div className={style.filterMenu}>
			<ButtonSelect options={['Activity', 'Continent']} handler={handleParameter} />
			<div className={style.filterSelection}>
			{selected.parameter ?
				selected.parameter === 'Continent' ?
				<ButtonSelect options={continents} handler={handleOption} /> :
				selected.parameter === 'Activity' ?
				<ButtonSelect options={activities} handler={handleOption} /> : <></> : null}
			</div>
		</div>
	);
}

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

	useEffect(() => {
		if (!filterMenuIsActive) dispatch({ type: 'SET_FILTER', payload: { type: '', value: '' } })
	},[filterMenuIsActive, dispatch])

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
				<button onClick={handleOptions} name="by" className="material-icons" title={order.by === 'name' ? 'Alphabetical' : 'Population'}>
					{order.by === 'name' ? 'sort_by_alpha' : 'group'}
				</button>
				<button onClick={handleOptions} name="direction" className="material-icons">
					{order.direction === 'DESC' ? 'south' : 'north'}
				</button>
				<button onClick={toggleFilterMenu} name="filter" className="material-icons" title="Filters">
					filter_list
				</button>
			</div>
			{filterMenuIsActive ? <FilterMenu /> : null}
		</div>
	);
}

function PageNav({ index, handlePageNav }) {
	const nextPage = useSelector(store => store.page.nextPage);
	return (
		<div className={style.navigation}>
			<div id="increment">
				{index > 1 ? (
					<button className="material-icons" name="decrementPage" onClick={handlePageNav}>
						navigate_before
					</button>
				) : null}
			</div>
			<h1>{index}</h1>
			<div id="decrement">
				{nextPage ? (
					<button className="material-icons" name="incrementPage" onClick={handlePageNav}>
						navigate_next
					</button>
				) : null}
			</div>
		</div>
	);
}

export default function CardContainer() {
	const [index, setIndex] = useState(1); /* page index */

	const dispatch = useDispatch();
	const page = useSelector((store) => store.page);
	const filter = useSelector((store) => store.filter);
	const order = useSelector((store) => store.order);

	useEffect(() => {
		dispatch(loadPage(index,{ order, filter }));
	}, [dispatch, order, filter, index]);

	useEffect(() => {
		setIndex(1); //por seguridad
	},[filter])

	function handlePageNav(event) {
		const { name } = event.target;
		if (name === 'incrementPage') setIndex(index + 1);
		if (name === 'decrementPage') setIndex(index - 1);
	}

	return (
		<div className={style.main}>
			<SearchOptions />
			{page.content ? (
				<div className={style.cardContainer}>
					{page.content.map((country) => (
						<CountryCard key={country.id} id={country.id} name={country.name} flag={country.flag} continent={country.continent} />
					))}
				</div>
			) : (
				<div className="loader"></div>
			)}
			<PageNav index={index} handlePageNav={handlePageNav} />
		</div>
	);
}
