import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import style from './ActivityForm.module.css';


function FormCountries({ onCountryClick, countries }) {
    const [input, setInput] = useState('');
    const [searchResults, setSearchResults] = useState(countries);

	function handleChange(event) {
		const { value } = event.target;
		setInput(value);
    }

    useEffect(() => { 
        setSearchResults(countries);
    },[countries])

	console.log(countries);

	return (
		<div className={style.formCountries}>
			<input type="text" value={input} onChange={handleChange} placeholder="Search"></input>
			<div className={style.countryContainer}>
				{searchResults.filter((result) => result.startsWith(input)).map((country) => (
                    <button className={style.countryPill} key={country} onClick={onCountryClick} value={country}>
						{country}
					</button>
				))}
			</div>
		</div>
	);
}

export default function ActivityForm() {
    const [state, setState] = useState({
        name: '',
        season: 'summer',
        duration: 0,
        difficulty: 0,
        countries: [],
    });

    const [submited, setSubmited] = useState(false);
	
    const [countries, setCountries] = useState(useSelector((store) => store.countries).map((country) => country.name));
    
    const forms = [
		<input id="form-name" type="text" name="name" placeholder="Name" onChange={handleInputChange}/>,
		<select value={state.season} id="form-season" name="season" onChange={handleInputChange} onFocus={handleInputChange}>
			<option value="summer">Summer</option>
			<option value="fall">Fall</option>
			<option value="winter">Winter</option>
			<option value="spring">Spring</option>
		</select>,
		<input id="form-duration" type="number" name="duration" min="0" onChange={handleInputChange} />,
		<input id="form-difficulty" type="range" defaultValue="3" min="1" max="5" name="difficulty" onChange={handleInputChange} />,
        <FormCountries onCountryClick={addCountry} countries={countries} />,
	];
    
    const labels = [
        <h2>What's the name of the activity?</h2>,
        <h2>What season is the best for it?</h2>,
        <h2>How long does it take (in minutes)</h2>,
        <h2>How difficult is it?</h2>,
        <h1>Where can you do it?</h1>
    ]

    const [formIndex, setFormIndex] = useState(0)

    function handleInputChange(event) {
        event.preventDefault();
		const { name, value } = event.target;
		setState({
			...state,
			[name]: value,
		});
	}

	function handleSubmit() {
        axios.post(`http://localhost:3001/activity`, state)
            .then(() => { setSubmited(true);})
            .catch((err) => console.error(err));
    }
    
    function nextForm() {
        setFormIndex(formIndex + 1);
    }

    function addCountry(event) {
        const { value } = event.target;
        setCountries(countries.filter((country) => country !== value));
		console.log(event.target, countries);
        setState({
            ...state,
            countries: [...state.countries, value]
        })
    }

    return !submited ? (
		<div className={style.container}>
			<div className={style.infoContainer}>
				{formIndex >= 0 ? <h1>{state.name}</h1> : <div className={style.namePlaceholder}></div>}
				{formIndex >= 1 ? <span>{state.season}</span> : <div className={style.seasonPlaceholder}></div>}
				{formIndex >= 2 ? <span>{state.duration}</span> : <div className={style.durationPlaceholder}></div>}
				{formIndex >= 3 ? <span>{state.difficulty}</span> : <div className={style.difficultyPlaceholder}></div>}
				{formIndex >= 4 ? state.countries.map((country) => <div>{country}</div>) : <div className={style.countriesPlaceholder}></div>}
			</div>
			<div className={style.formContainer}>
				{labels[formIndex]}
				{forms[formIndex]}
				{formIndex < forms.length - 1 ? <button onClick={nextForm}>Next</button> : <button onClick={handleSubmit}>Submit</button>}
			</div>
		</div>
	) : (
		<div className={style.success}>
			<h1>Activity created successfully!</h1>
		</div>
	);

}
