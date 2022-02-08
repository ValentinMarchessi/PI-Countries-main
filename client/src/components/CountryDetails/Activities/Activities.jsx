import style from '../CountryDetails.module.scss';

function ActivityCard({ name, duration, difficulty, season }) {
	return (
		<div className={style.activityCard}>
			<h1>{name}</h1>
			<span>Duration: {duration} mins</span>
			<span>Difficulty: {difficulty}/5</span>
			<span>Season: {season}</span>
		</div>
	);
}

export default function Activities({ activities }) {

    const activityCards = activities.map(activity => {
        return <ActivityCard
            name={activity.name}
            duration={activity.duration}
            difficulty={activity.difficulty}
            season={activity.season} />
    });

    return (
		<div className={style.activities}>
			<h1>Activities</h1>
			<div className={style.activitiesContainer}>{activityCards.length ? activityCards : <h2>No activities available, sorry!</h2>}</div>
		</div>
	);
}