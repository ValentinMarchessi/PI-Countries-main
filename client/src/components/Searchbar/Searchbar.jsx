import axios from 'axios';
import { useState, useEffect } from 'react';
import style from './Searchbar.module.scss';
import { Link } from 'react-router-dom';

export default function Searchbar() {
    const [input, setInput] = useState("");
    const [results, setResults] = useState([]);

    useEffect(() => {
        if (input) {
            (async () => {
                try {
                    const response = await axios.get(`http://localhost:3001/countries?name=${input}`)
                    setResults(response.data);
                }
                catch {
                    setResults([]);
                }
            })();
        } else {
            setResults([]);
        }
    },[input,setResults])

    function handleChange(e){
        const { value } = e.target;
        setInput(value);
    }

    return (
        <div className={style.container}>
            <div className={style.searchbar}>
                <input type="text" className={style.input} placeholder="Canada" onChange={handleChange} />
                {results.length ?
                    <div className={style.dropdown}>
                        {results.map((result) =>
                            <Link to={`/country/${result.id}`}>
                                {result.name}
                            </Link>
                        )}
                    </div>
                    :
                    <div></div>
                }
            </div>
        </div>
    )
}