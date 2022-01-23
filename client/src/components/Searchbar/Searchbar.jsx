import { useState } from 'react';
import style from './Searchbar.module.css';

export default function Searchbar() {
    const [input, setInput] = useState("");

    function handleChange(e){
        const { value } = e.target;
        setInput(value);
    }

    return (
        <div className={style.container}>
            <h1>Find your destination...</h1>
            <input type="text" className={style.input} placeholder="Canada"/>
        </div>
    )
}