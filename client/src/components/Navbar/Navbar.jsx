import { useState } from 'react';
import style from './Navbar.module.css';

export default function Navbar() {
    const [input, setInput] = useState({
        searchBar: ''
    })

    function handleChange(e){
        const { value } = e.target;
        setInput({ searchBar: value });
    }

    return (
        <nav className={style.navbar}>
        </nav>
    )
}