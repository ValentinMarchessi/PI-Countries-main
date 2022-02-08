import style from './InfoContainer.module.css'

export default function InfoContainer({info}) {
	let { name, season, duration, difficulty, countries } = info;
	console.log(name, season, duration, difficulty, countries, info);
	
	const placeholder = <svg className={style.placeholder}>
		<rect/>
	</svg>

    return (
		<div className={style.container}>
			<h1>I'll go {name ? name : placeholder}</h1>
			<span>this {season ? season : placeholder}</span>
			<span>it should take {duration ? duration : placeholder} minutes</span>
			<span>its a {difficulty ? difficulty : placeholder}/5 in terms of difficulty</span>
			<div className={style.infoCountries}>
				<span>I can do it in...</span>
				<div className={style.infoCountriesContainer}>
					{countries ? countries.map((country) => <div className={style.infoCountry}>{country}</div>) : placeholder}
				</div>
			</div>
		</div>
	);
}