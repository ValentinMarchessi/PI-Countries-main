import CountryCard from '../CountryCard/CountryCard.jsx';
import style from './CardContainer.module.css';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadPage } from '../../redux/actions';
import SearchOptions from '../SearchOptions/SearchOptions.jsx';

function PageNav({ index, handlePageNav }) {
	const nextPage = useSelector(store => store.page.current.nextPage);
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
	const { content } = useSelector((store) => store.page.current);
	const {order, filter} = useSelector((store) => store.page);

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
			{content ? (
				<div className={style.cardContainer}>
					{content.map((country) => (
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
