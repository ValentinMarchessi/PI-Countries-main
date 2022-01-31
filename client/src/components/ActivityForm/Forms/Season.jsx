import style from './Season.module.css'

export default function Season({ onSuccess }) {
	function handleSubmit(event) {
		const { name, value } = event.target[0];
		onSuccess(name, value, event);
	}

	return (
		<div className={style.container}>
			<h2>What season is the best for it?</h2>
			<form onSubmit={handleSubmit}>
				<select name="season" defaultValue="summer">
					<option value="summer">Summer</option>
					<option value="fall">Fall</option>
					<option value="winter">Winter</option>
					<option value="spring">Spring</option>
				</select>
				<button type="submit">Next</button>
			</form>
		</div>
	);
}
