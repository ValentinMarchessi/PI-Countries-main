import { useState } from 'react';
import style from './Duration.module.scss';

export default function Duration({ onSuccess }) {
	const [error, setError] = useState('');

	function handleSubmit(event) {
		event.preventDefault();
		const { name, value } = event.target[0];
		if (!value || value > 300) {
			setError('Duration must be between 1 and 300 minutes.');
		} else {
			onSuccess(name, value, event);
		}
	}

	return (
		<div className={style.container}>
			<h2>How long does it take (in minutes)</h2>
			<form onSubmit={handleSubmit}>
				<input type="number" name="duration" min="1" />
				{error ? <span className={style.validationError}>{error}</span> : null}
				<button type="submit">Next</button>
			</form>
		</div>
	);
}
