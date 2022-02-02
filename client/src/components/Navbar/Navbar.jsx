import style from './Navbar.module.css';
import { Link } from 'react-router-dom';
import logo from './Octicons-globe.svg';

export default function Navbar() {
    return (
        <nav className={style.navbar}>
            <div id={style.slogan}>
                <img id={style.logo} src={logo} alt="logo"></img>
                <h1>Countries</h1>
            </div>
            <div id={style.links}>
                <Link to='/home'>Home</Link>
                <Link to='activity/create'>Create Activity</Link>
            </div>
        </nav>
    )
}