import CountryCard from '../CountryCard/CountryCard.jsx';
import style from './CardContainer.module.css';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadPage } from '../../redux/actions';
import SearchOptions from '../SearchOptions/SearchOptions.jsx';

function PageNav() {
	const { count } = useSelector((store) => store.page.current);
	const { filter } = useSelector((store) => store.page);
	const [index, setIndex] = useState(1); /* page index */
	const dispatch = useDispatch();
	const pageCount = Math.ceil(count / 10)

	useEffect(() => {
		dispatch({ type: 'SET_INDEX', payload: index });
	},[index,dispatch])

	useEffect(() => {
		setIndex(1); //por seguridad
	}, [filter]);

	function handlePageNav(event) {
		const { name } = event.target;
		if (name === 'decrementPage') setIndex(index - 1);
		if (name === 'incrementPage') setIndex(index + 1);
		if (name === 'gotoFirst') setIndex(1);
		if (name === 'gotoLast') setIndex(pageCount);
	}

	return (
		<div className={style.navigation}>
			<div id="first">
				{index > 1 ? (
					<button className="material-icons" name="gotoFirst" title="Go to first page" onClick={handlePageNav}>
						keyboard_double_arrow_left
					</button>
				) : null}
			</div>
			<div id="decrement">
				{index > 1 ? (
					<button className="material-icons" name="decrementPage" onClick={handlePageNav}>
						navigate_before
					</button>
				) : null}
			</div>
			<h1>{index}</h1>
			<div id="increment">
				{index < pageCount ? (
					<button className="material-icons" name="incrementPage" onClick={handlePageNav}>
						navigate_next
					</button>
				) : null}
			</div>
			<div id="last">
				{index < pageCount ? (
					<button className="material-icons" name="gotoLast" title="Go to last page" onClick={handlePageNav}>
						keyboard_double_arrow_right
					</button>
				) : null}
			</div>
		</div>
	);
}

export default function CardContainer() {
	
	const dispatch = useDispatch();
	const { content } = useSelector((store) => store.page.current);
	const { order, filter } = useSelector((store) => store.page);
	const index = useSelector(store => store.index)

	useEffect(() => {
		dispatch(loadPage(index,{ order, filter }));
	}, [dispatch, order, filter, index]);

	return (
		<div className={style.main}>
			<SearchOptions />
			{content ? (
				<div className={style.cardContainer}>
					{content.map((country) => (
						<CountryCard key={country.id} id={country.id} name={country.name} flag={country.flag} continent={country.continent} />
					))}
				</div>
			) : (
				<div className="loader"></div>
			)}
			<PageNav/>
		</div>
	);
}
