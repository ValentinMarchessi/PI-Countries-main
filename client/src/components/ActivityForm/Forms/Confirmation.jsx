import style from './Confirmation.module.scss'

export default function Confirmation({ onConfirmation, onRestart }) {
	return (
		<div className={style.container}>
			<h1>Almost done!</h1>
			<p>Check if all the details are correct. If you're not sure about something, you can restart the process.</p>
			<div className={style.buttonContainer}>
				<button onClick={onConfirmation}>Confirm</button>
				<button onClick={onRestart}>Restart</button>
			</div>
		</div>
	);
}
