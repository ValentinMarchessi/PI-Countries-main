import { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import style from './ActivityForm.module.css';

function NameForm({onSuccess}) {
	const [error, setError] = useState('');

	function handleSubmit(event) {
		event.preventDefault();
		const { name, value } = event.target[0]; //name input value destruct
		console.log(event);
		if (!value || value.length > 15) {
			setError('Name must be between 1 and 15 characters long.')
		}
		else {
			onSuccess(name,value,event);
		}
	}

	return (
		<div className={style.content}>
			<h2>What's the name of the activity?</h2>
			<form onSubmit={handleSubmit}>
				<input id="form-name" type="text" name="name" placeholder="Name" />
				{error ? <div className={style.validationError}>{error}</div> : null}
				<button type="submit">Next</button>
			</form>
		</div>
	);
}

function SeasonForm({onSuccess}) {
	
	function handleSubmit(event) {
		const { name, value } = event.target[0];
		onSuccess(name, value, event);
	}

	return (
		<div className={style.content}>
			<h2>What season is the best for it?</h2>
			<form onSubmit={handleSubmit}>
				<select id="form-season" name="season">
					<option selected value="summer">
						Summer
					</option>
					<option value="fall">Fall</option>
					<option value="winter">Winter</option>
					<option value="spring">Spring</option>
				</select>
				<button type="submit">Next</button>
			</form>
		</div>
	);
}

function DurationForm({ onSuccess }) {
	const [error, setError] = useState('');
	
	function handleSubmit(event) {
		const { name, value } = event.target[0];
		if (value > 300) {
			setError('Duration must be between 1 and 300 minutes.');
		}
		else {
			onSuccess(name,value,event);
		}
	}

	return (
		<div>
			<h2>How long does it take (in minutes)</h2>
			<form onSubmit={handleSubmit}>
				<input id="form-duration" type="number" name="duration" min="1" />
				{error ? <span className={style.validationError}>{error}</span> : null}
				<button type="submit">Next</button>
			</form>
		</div>
	);
}

function DifficultyForm({onSuccess}) {
	
	function handleSubmit(event) {
		const { name, value } = event.target[0];
		onSuccess(name,value,event);
	}

	return (
		<div className={style.content}>
			<h2>How difficult is it?</h2>
			<form onSubmit={handleSubmit}>
				<input id="form-difficulty" type="range" defaultValue="3" min="1" max="5" name="difficulty" />
				<button type="submit">Next</button>
			</form>
		</div>
	);
}

function CountriesForm({ onSuccess }) {
	const countries = useSelector((store) => store.countries).map((country) => country.name);
	const [selected, setSelected] = useState([])
	const [input, setInput] = useState('');
	const [error, setError] = useState('');

	function handleChange(event) {
		const { value } = event.target;
		setInput(value);
	}

	function handleCountryPill(event) {
		const countryPill = event.target;
		countryPill.classList.toggle(style.selected);
		if (!selected.includes(countryPill.value)){
			setSelected([...selected, countryPill.value]);
		} else {
			setSelected(selected.filter(country => country !== countryPill.value));
		}
	}

	function handleSubmit(event) {
		event.preventDefault();
		if (selected.length === 0) {
			setError('Please select a country.');
		} else {
			onSuccess('countries',selected,event);
		}
	}

	const countriesPills = countries.map((country) => {
		return (
			<button
				className={selected.includes(country) ? `${style.countryPill} ${style.selected}` : `${style.countryPill}`}
				key={country}
				onClick={handleCountryPill}
				value={country}>
				{country}
			</button>
		);
	});

	return (
		<div className={style.content}>
			<h1>Where can you do it?</h1>
			<input type="text" value={input} onChange={handleChange} placeholder="Search"></input>
			<div className={style.countryContainer}>
				{countriesPills.filter(({props}) => props.value.startsWith(input))}
			</div>
			{error ? <div className={style.validationError}>{error}</div> : null}
			<button onClick={handleSubmit}>Next</button>
		</div>
	);
}

function ConfirmationForm({ onConfirmation }) {
	return (
		<div className={style.content}>
			<h1>Almost done!</h1>
			<p>Check if all the details are correct. If you're not sure about something, you can restart the process.</p>
		</div>
	)
}

export default function ActivityForm() {
    const [state, setState] = useState({
        name: '',
        season: '',
        duration: 0,
        difficulty: 0,
        countries: [],
    });

    const [submited, setSubmited] = useState(false);
	    
    const forms = [
		<NameForm onSuccess={handleSuccess} />,
		<SeasonForm onSuccess={handleSuccess} />,
		<DurationForm onSuccess={handleSuccess} />,
		<DifficultyForm onSuccess={handleSuccess}/>,
		<CountriesForm onSuccess={handleSuccess}/>,
		<ConfirmationForm onConfirmation={handleSubmit}/>
	];

    const [formIndex, setFormIndex] = useState(4)

	function handleSuccess(name, value, event) {
		if (event) {
			event.preventDefault();
			setState({
				...state,
				[name]: value,
			});
		}
        setFormIndex(formIndex + 1);
	}

	function handleSubmit() {
        axios.post(`http://localhost:3001/activity`, state)
            .then(() => { setSubmited(true);})
            .catch((err) => console.error(err));
    }

    return !submited ? (
		<div className={style.container}>
			<div className={style.infoContainer}>
				{formIndex > 0 ? <h1>{state.name}</h1> : <div className={style.namePlaceholder}></div>}
				{formIndex > 1 ? <span>{state.season}</span> : <div className={style.seasonPlaceholder}></div>}
				{formIndex > 2 ? <span>{state.duration}</span> : <div className={style.durationPlaceholder}></div>}
				{formIndex > 3 ? <span>{state.difficulty}</span> : <div className={style.difficultyPlaceholder}></div>}
				{formIndex > 4 ? state.countries.map((country) => <div>{country}</div>) : <div className={style.countriesPlaceholder}></div>}
			</div>
			<div className={style.formContainer}>
				{forms[formIndex]}
			</div>
		</div>
	) : (
		<div className={style.success}>
			<h1>Activity created successfully!</h1>
		</div>
	);
}