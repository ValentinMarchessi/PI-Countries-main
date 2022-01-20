import { Link } from 'react-router-dom';
import style from './Landing.module.css';

export default function Landing (){
    return (
        <div className={style.landing}>
            <h1>Countries</h1>
            <Link to='/home'><button>Home</button></Link>
        </div>
    )
}