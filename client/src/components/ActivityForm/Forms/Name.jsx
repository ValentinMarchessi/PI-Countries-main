import { useState } from 'react';
import style from './Name.module.css';

export default function Name({ onSuccess }) {
	const [error, setError] = useState('');

	function handleSubmit(event) {
		event.preventDefault();
		const { name, value } = event.target[0]; //name input value destruct
		if (!value || value.length > 15) {
			setError('Name must be between 1 and 15 characters long.');
		} else {
			onSuccess(name, value, event);
		}
	}

	return (
		<div className={style.container}>
			<h2>What's the name of the activity?</h2>
			<form onSubmit={handleSubmit}>
				<input type="text" name="name" placeholder="Name" />
				{error ? <div className={style.validationError}>{error}</div> : null}
				<button type="submit">Next</button>
			</form>
		</div>
	);
}
