import style from '../CountryDetails.module.scss';

//transforma números de la forma 1495428 a 1.495.428 para mayor legibilidad
function formatNumber(number) {
	if (typeof number !== 'number') throw new TypeError(`Expecting number, got ${typeof number}`);
	let str_number = number.toString();
	let formated = '';
	for (var i = str_number.length - 1, j = 0; i >= 0; i--, j++) {
		if ((i + 1) % 3 === 0 && str_number[i + 1]) formated += '.';
		formated += str_number[j];
	}
	return formated;
}

export default function Details({country}) {
    return (
		<div className={style.info}>
			<div className={style.header}>
				<h1>
					{country.name} ({country.id})
				</h1>
				<h3>{country.continent}</h3>
				<h4>{country.subregion}</h4>
			</div>
			<img src={country.flag} alt="flag"></img>
			<span>Capital: {country.capital}</span>
			<span>Population: {formatNumber(country.population)}</span>
			<span>Area: {formatNumber(country.area)}km2</span>
		</div>
	);
}