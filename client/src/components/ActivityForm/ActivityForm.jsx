import { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadCountries } from '../../redux/actions';
import axios from 'axios';
import style from './ActivityForm.module.css';

function NameForm({onSuccess}) {
	const [error, setError] = useState('');

	function handleSubmit(event) {
		event.preventDefault();
		const { name, value } = event.target[0]; //name input value destruct
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
				<input type="text" name="name" placeholder="Name" />
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
				<select name="season" defaultValue="summer">
					<option value="summer">
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
		event.preventDefault();
		const { name, value } = event.target[0];
		if (!value || value > 300) {
			setError('Duration must be between 1 and 300 minutes.');
		}
		else {
			onSuccess(name,value,event);
		}
	}

	return (
		<div className={style.content}>
			<h2>How long does it take (in minutes)</h2>
			<form onSubmit={handleSubmit}>
				<input type="number" name="duration" min="1" />
				{error ? <span className={style.validationError}>{error}</span> : null}
				<button type="submit">Next</button>
			</form>
		</div>
	);
}

function DifficultyForm({ onSuccess }) {
	const [display, setDisplay] = useState(3);
	
	function handleSubmit(event) {
		const { name, value } = event.target[0]; //event target es un array con los nodos hijos del form
		onSuccess(name,value,event);
	}

	function handleDisplay(event) {
		const { value } = event.target;
		setDisplay(value);
	}

	return (
		<div className={style.content}>
			<h2>How difficult is it?</h2>
			<h3>{display}</h3>
			<form onSubmit={handleSubmit}>
				<input id="form-difficulty" type="range" value={display} onChange={handleDisplay} defaultValue="3" min="1" max="5" name="difficulty" />
				<button type="submit">Next</button>
			</form>
		</div>
	);
}

function CountriesForm({ onSuccess }) {
	const countries = useSelector((store) => store.countries);
	const [selected, setSelected] = useState([])
	const [input, setInput] = useState('');
	const [error, setError] = useState('');
	const dispatch = useDispatch();

	useEffect(() => {
		if(!countries.length) dispatch(loadCountries());
	},[dispatch, countries])

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

function ConfirmationForm({ onConfirmation, onRestart }) {
	return (
		<div className={style.content}>
			<h1>Almost done!</h1>
			<p>Check if all the details are correct. If you're not sure about something, you can restart the process.</p>
			<div className={style.buttonContainer}>
				<button onClick={onConfirmation}>Confirm</button>
				<button onClick={onRestart}>Restart</button>
			</div>
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
    const [formIndex, setFormIndex] = useState(0);
    const [submited, setSubmited] = useState(false);

	/*Refs for placeholders*/
	const infoContRef = useRef(null);
	    
    const forms = [
		<NameForm onSuccess={handleSuccess} />,
		<SeasonForm onSuccess={handleSuccess} />,
		<DurationForm onSuccess={handleSuccess} />,
		<DifficultyForm onSuccess={handleSuccess}/>,
		<CountriesForm onSuccess={handleSuccess}/>,
		<ConfirmationForm onConfirmation={handleSubmit} onRestart={handleRestart}/>
	];


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
	
	function handleRestart() {
		setState({
			name: '',
			season: '',
			duration: 0,
			difficulty: 0,
			countries: [],
		});
		setFormIndex(0);
		infoContRef.current.childNodes.forEach(node => node.classList.toggle(style.placeholder))
	}

	useEffect(() => {
		//const [name, season, duration, difficulty, countries] = infoContRef.current.childNodes;
		if(formIndex - 1 >= 0) infoContRef.current.childNodes[formIndex - 1].classList.toggle(style.placeholder);
	}, [formIndex]);


    return !submited ? (
		<div className={style.container}>
			<div className={style.infoContainer} ref={infoContRef}>
				<h1 className={style.placeholder}>I'll go {state.name}</h1>
				<span className={style.placeholder}>this {state.season}</span>
				<span className={style.placeholder}>it should take {state.duration} minutes</span>
				<span className={style.placeholder}>its a {state.difficulty}/5 in terms of difficulty</span>
				<div className={`${style.placeholder} ${style.infoCountries}`}>
					<span>I can do it in...</span>
					<div className={style.infoCountriesContainer}>
						{state.countries.map((country) => (
							<div className={style.infoCountry}>{country}</div>
						))}
					</div>
				</div>
			</div>
			<div className={style.formContainer}>{forms[formIndex]}</div>
		</div>
	) : (
		<div className={style.success}>
			<h1>Activity created successfully!</h1>
		</div>
	);
}