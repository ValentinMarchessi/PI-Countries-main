import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadActivities, loadContinents } from '../../redux/actions';
import style from './SearchOptions.module.scss';

function ButtonSelect({ options, handler }) {
	const [selected, setSelected] = useState('');
	const [buttons, setButtons] = useState([]);

	useEffect(() => {
		function handleButton(event) {
			const { value } = event.target;
			selected !== value ? setSelected(value) : setSelected('');
			selected !== value ? handler(value) : handler('');
		}

		if (options)
			setButtons(
				options.map((option) => {
					//option.value == selected es seguro, es una comparación number == 'number' en caso de que option.value sea un número,
					return (
						<button className={`${option.value == selected ? `${style.selected}` : ''}`} key={option.value} value={option.value} onClick={handleButton}>
							{option.name}
						</button>
					);
				})
			);
	}, [selected, setButtons, options, handler]);

	return options && options.length ? <div className={style.buttonSelect}>{buttons}</div> : <h1 id={style.optionError}>No options available.</h1>;
}

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
