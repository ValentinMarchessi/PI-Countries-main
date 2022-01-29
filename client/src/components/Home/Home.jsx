import CardContainer from '../CardContainer/CardContainer.jsx';
import Searchbar from '../Searchbar/Searchbar.jsx';
import { Link } from 'react-router-dom';
import style from './Home.module.css';

export default function Home() {
    return (
		<div className={style.Home}>
			<h1 className={style.moto}>Find your destination...</h1>
			<Searchbar />
			<CardContainer />
			<Link to="/activity/create">Create your activity!</Link>
		</div>
	);
}