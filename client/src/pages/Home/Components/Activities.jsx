import React, { useState, useEffect } from 'react';
import { getDatas } from '../../../services/api.js';
import style from '../home.module.css';

function Activities() {
    const [activities, setActivities] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const activities = await getDatas('/home/lastActivities');
                console.log('activité : ', activities.data.result);
                setActivities(activities.data.result);
            } catch (error) { }
        }

        fetchData();
    }, []);

    const renderActivity = (activity) => {
        const localDate = new Date(activity.createdAt).toLocaleString();

        switch (activity.type) {
            case 'document':
                return <li key={activity.id} className={style.activityItem}>{localDate} | Un document vient d'être publié : {activity.title}</li>;
            case 'event':
                return <li key={activity.id} className={style.activityItem}>{localDate} | Un événement vient d'être planifié : {activity.title}</li>;
            default:
                return null;
        }
    };

    return (
        <ul className={style.activitiesList}>
            {activities ? (
                 activities.map((a) => renderActivity(a)) 
            ) : null}
        </ul>
    );
}

export default Activities;