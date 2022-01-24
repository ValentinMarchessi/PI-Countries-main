import { useState } from 'react';
import axios from 'axios';
import style from './ActivityForm.module.css';

export default function ActivityForm() {
    const [state, setState] = useState({
        name: "",
        season: "summer",
        duration: 0,
        difficulty: 3,
    })

    function handleInputChange(event) {
        const { name, value } = event.target;
        setState({
            ...state,
            [name]: value
        })
    }

    function handleSubmit(event) {
        event.preventDefault();
        axios.post(`http://localhost:3001/activity`, state).catch(err => console.error(err));
    }

    return (
        <div className={style.container}>
            <h1>Form</h1>
            <form onSubmit={handleSubmit}>
                <input
                    id="form-name"
                    type="text"
                    name="name"
                    placeholder="Name"
                    onChange={handleInputChange}
                />  
                <select
                    id="form-season"
                    name="season"
                    onChange={handleInputChange}
                >
                    <option value="summer">Summer</option>
                    <option value="fall">Fall</option>
                    <option value="winter">Winter</option>
                    <option value="spring">Spring</option>
                </select>
                <input 
                    id="form-duration" 
                    type="number" 
                    name="duration"
                    onChange={handleInputChange}
                />
                <input 
                    id="form-difficulty" 
                    type="range" 
                    defaultValue='3'
                    min="1" 
                    max="5" 
                    name="difficulty"
                    onChange={handleInputChange}
                />
                <input
                    type="submit" 
                    value="Submit"
                />
            </form>
        </div>
    )
}