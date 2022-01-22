import style from './CountryCard.module.css';

export default function CountryCard({name, flag, continent}) {
    return (
        <div className={style.card}>
            <img src={flag} alt='flag'></img>
            <h1>{name}</h1>
        </div>
    )
}