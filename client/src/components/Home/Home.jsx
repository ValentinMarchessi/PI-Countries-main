import CardContainer from '../CardContainer/CardContainer.jsx';
import Searchbar from '../Searchbar/Searchbar.jsx';
import style from './Home.module.css';

export default function Home() {

    return (
        <div className={style.Home}>
            <Searchbar />
            <CardContainer/>
        </div>
    )
}