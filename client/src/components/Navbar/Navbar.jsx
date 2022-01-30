import style from './Navbar.module.css';
import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <nav className={style.navbar}>
            <Link to='/home'>Home</Link>
            <Link to='activity/create'>Create Activity</Link>
        </nav>
    )
}