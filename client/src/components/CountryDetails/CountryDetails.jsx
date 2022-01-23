import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import style from './CountryDetails.module.css';

export default function CountryDetails() {
    const [country, setCountry] = useState({});
    const { id } = useParams();
    
    useEffect(() => {
        axios.get(`http://localhost:3001/countries/${id}`).then(({data}) => {
            setCountry(data);
        })
    },[id])


    return (
        <div className={style.container}>

        </div>
    )
}