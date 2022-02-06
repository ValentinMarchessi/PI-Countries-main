import style from './CountryCard.module.scss';
import { Link } from 'react-router-dom';

export default function CountryCard({id, name, flag, continent}) {
    return (
		<div className={style.card}>
			<Link to={`/country/${id}`}>
				<img src={flag} alt="flag"></img>
			</Link>
			<div className={style.infoBox}>
				<h1>{name}</h1>
				<span>{continent}</span>
			</div>
		</div>
	);
}