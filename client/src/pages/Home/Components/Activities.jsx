import React, { useState, useEffect } from 'react';
import { getDatas } from '../../../services/api.js';
import style from '../home.module.css';
import loader from "../../../assets/img/loader.svg";

const Activities = () => {
  const [activities, setActivities] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const activities = await getDatas('/home/lastActivities');
        setActivities(activities.data.result);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  const renderActivity = (activity) => {
    const localDate = new Date(activity.createdAt).toLocaleString();

    switch (activity.type) {
      case 'document':
        return (
          <li key={activity.id} className={style.activityItem}>
            {localDate} | Un document vient d'être publié : {activity.title}
          </li>
        );
      case 'event':
        return (
          <li key={activity.id} className={style.activityItem}>
            {localDate} | Un événement vient d'être planifié : {activity.title}
          </li>
        );
      default:
        return null;
    }
  };

  return (
    <ul className={style.activitiesList}>
      {isLoading ? (
        <div className="loader"><img src={loader} alt="" /></div>
      ) : (
        activities && activities.map((a) => renderActivity(a))
      )}
    </ul>
  );
}

export default Activities;