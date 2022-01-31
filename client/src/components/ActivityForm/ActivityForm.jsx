import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import style from './ActivityForm.module.css';
import { Confirmation, Name, Season, Duration, Difficulty, Countries } from './Forms';
import InfoContainer from './InfoContainer';

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
	const navigate = useNavigate();
	    
    const forms = [
		<Name onSuccess={handleSuccess} />,
		<Season onSuccess={handleSuccess} />,
		<Duration onSuccess={handleSuccess} />,
		<Difficulty onSuccess={handleSuccess}/>,
		<Countries onSuccess={handleSuccess}/>,
		<Confirmation onConfirmation={handleSubmit} onRestart={handleRestart}/>
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
	}

	useEffect(() => {
		if (submited) {
			setTimeout(() => {
				navigate('/home', { replace: true });
			},3000)
		}
	},[submited, navigate])


    return !submited ? (
		<div className={style.container}>
			<InfoContainer info={state}/>
			<div className={style.formContainer}>{forms[formIndex]}</div>
		</div>
	) : (
		<div className={style.success}>
				<h1>Activity created successfully!</h1>
				<h2>Redirecting Home...</h2>
		</div>
	);
}