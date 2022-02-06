import { Link } from 'react-router-dom';
import style from './Landing.module.scss';
import video from './AirplaneFootage.mp4';

export default function Landing (){
    return (
        <div className={style.landing}>
            <div className={style.container}>
                <h1>Hollie</h1>
                <Link to='/home'><button>Home</button></Link>
            </div>
            <video autoPlay muted loop>
                <source src={video} type="video/mp4"/>
                Failed to load video.
            </video>
        </div>
    )
}