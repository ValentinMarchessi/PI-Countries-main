import style from './CountryCard.module.css';

export default function CountryCard({name, flag, continent}) {
    return (
        <div className={style.card}>
            <img src={flag} alt='flag'></img>
            <div className={style.infoBox}>
                <span>{name}</span>
                <span>{continent}</span>
            </div>
        </div>
    )
}