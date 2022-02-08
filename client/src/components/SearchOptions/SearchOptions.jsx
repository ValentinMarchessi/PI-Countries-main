import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadActivities, loadContinents } from '../../redux/actions';
import style from './SearchOptions.module.scss';

import ButtonSelect from '../ButtonSelect/ButtonSelect';

function FilterMenu() {
	const dispatch = useDispatch();
	const activities = useSelector((store) => store.activities).map((activity) => { return {name: activity.name, value:	activity.id}});
	const continents = useSelector((store) => store.continents).map((continent) => { return { name: continent, value: continent } });
	//name es para el display
	//value es el valor que eventualmente recibe la API, debe ser único
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
			<ButtonSelect options={['Activity', 'Continent'].map((e) => {return {name: e, value:e}})} handler={handleParameter} />
			<div className={style.filterSelection}>{selected.parameter ? selected.parameter === 'Continent' ? <ButtonSelect options={continents} handler={handleOption} /> : selected.parameter === 'Activity' ? <ButtonSelect options={activities} handler={handleOption} /> : <></> : null}</div>
		</div>
	);
}

export default function SearchOptions() {
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
		if (!filterMenuIsActive) dispatch({ type: 'SET_FILTER', payload: { type: '', value: '' } });
	}, [filterMenuIsActive, dispatch]);

	function handleOptions(event) {
		const { name } = event.target;
		if (name === 'by') setOrder({ ...order, by: order.by === 'name' ? 'population' : 'name' });
		if (name === 'direction') setOrder({ ...order, direction: order.direction === 'DESC' ? 'ASC' : 'DESC' });
	}

	function toggleFilterMenu() {
		filterMenuIsActive ? setFilterMenuIsActive(false) : setFilterMenuIsActive(true);
	}

	return (
		<div className={style.container}>
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
