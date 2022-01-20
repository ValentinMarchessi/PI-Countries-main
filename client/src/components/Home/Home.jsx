import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchCountries } from '../../redux/actions';

import style from './Home.module.css';

export default function Home() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ name: 'HOME_LOAD' });
    },[dispatch])

    return (
        <div className={style.Home}>
            Home
        </div>
    )
}