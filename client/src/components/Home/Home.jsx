import CardContainer from '../CardContainer/CardContainer.jsx';
import Searchbar from '../Searchbar/Searchbar.jsx';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadCountries } from '../../redux/actions';
import style from './Home.module.css';

export default function Home() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadCountries());
    },[dispatch])

    return (
		<div className={style.Home}>
			<h1 className={style.moto}>Find your destination...</h1>
			<Searchbar />
			<CardContainer />
			<Link to="/activity/create">Create your activity!</Link>
		</div>
	);
}