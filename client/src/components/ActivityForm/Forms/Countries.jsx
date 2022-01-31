import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadCountries } from '../../../redux/actions';
import style from './Countries.module.css';

export default function Countries({ onSuccess }) {
	const countries = useSelector((store) => store.countries);
	const [selected, setSelected] = useState([]);
	const [input, setInput] = useState('');
	const [error, setError] = useState('');
	const dispatch = useDispatch();

	useEffect(() => {
		if (!countries.length) dispatch(loadCountries());
	}, [dispatch, countries]);

	function handleChange(event) {
		const { value } = event.target;
		setInput(value);
	}

	function handleCountryPill(event) {
		const countryPill = event.target;
		countryPill.classList.toggle(style.selected);
		if (!selected.includes(countryPill.value)) {
			setSelected([...selected, countryPill.value]);
		} else {
			setSelected(selected.filter((country) => country !== countryPill.value));
		}
	}

	function handleSubmit(event) {
		event.preventDefault();
		if (selected.length === 0) {
			setError('Please select a country.');
		} else {
			onSuccess('countries', selected, event);
		}
	}

	const countriesPills = countries.map((country) => {
		return (
			<button className={selected.includes(country) ? `${style.countryPill} ${style.selected}` : `${style.countryPill}`} key={country} onClick={handleCountryPill} value={country}>
				{country}
			</button>
		);
	});

	return (
		<div className={style.container}>
			<h1>Where can you do it?</h1>
			<input type="text" value={input} onChange={handleChange} placeholder="Search"></input>
			<div className={style.countryContainer}>{countriesPills.filter(({ props }) => props.value.startsWith(input))}</div>
			{error ? <div className={style.validationError}>{error}</div> : null}
			<button onClick={handleSubmit}>Next</button>
		</div>
	);
}
