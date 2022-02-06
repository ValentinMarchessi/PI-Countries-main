import { useState } from "react";
import style from './Difficulty.module.scss';

export default function Difficulty({ onSuccess }) {
	const [display, setDisplay] = useState(3);

	function handleSubmit(event) {
		const { name, value } = event.target[0]; //event target es un array con los nodos hijos del form
		onSuccess(name, value, event);
	}

	function handleDisplay(event) {
		const { value } = event.target;
		setDisplay(value);
	}

	return (
		<div className={style.container}>
			<h2>How difficult is it?</h2>
			<h3>{display}/5</h3>
			<form onSubmit={handleSubmit}>
				<input id="form-difficulty" type="range" value={display} onChange={handleDisplay} min="1" max="5" name="difficulty" />
				<button type="submit">Next</button>
			</form>
		</div>
	);
}
