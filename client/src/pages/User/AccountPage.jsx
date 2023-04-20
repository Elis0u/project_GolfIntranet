import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import style from "./accountPage.module.css";
import { AiOutlineEdit } from "react-icons/ai";
import { getDatas } from '../../services/api.js';

function AccountPage() {
  const user = useSelector((state) => state.user.infos);
  const [activitiesUser, setActivitiesUser] = useState(null);

  useEffect(() => {
    if (user.id) {
      async function fetchData() {
        try {
          const activitiesUser = await getDatas(`/user/activities_user?userId=${user.id}`);
          setActivitiesUser(activitiesUser.data.result);
        } catch (error) {
          throw new Error(error);
        }
      }
      fetchData();
    }
  }, [user.id]);

  const renderUserActivity = (activity) => {
    const localDate = new Date(activity.createdAt).toLocaleString();
    const uniqueKey = `${activity.activity_type}-${activity.id}`;
  
    switch (activity.activity_type) {
      case 'document':
        return (
          <li key={uniqueKey} className={style.activityItem}>
            {localDate} | Vous avez publié le document : {activity.title}
          </li>
        );
      case 'event':
        return (
          <li key={uniqueKey} className={style.activityItem}>
            {localDate} | Vous avez planifié un évènement : {activity.title}
          </li>
        );
      default:
        return (
          <li>
            Aucune activités de votre côté
          </li>
        );
    }
  };

  return (
    <main className={style.ctnDashboard}>
      <h2>DashBoard {user.firstName}</h2>

      <div className={style.ctnSection}>

        <section className={style.userInfo}>
          <button><AiOutlineEdit /></button>
          <h3>Vos informations</h3>

          <dl>
            <dt>Email :</dt>
            <dd>{user.email}</dd>

            <dt>Prénom :</dt>
            <dd>{user.firstName}</dd>

            <dt>Nom :</dt>
            <dd>{user.lastName}</dd>

            <dt>Date de naissance :</dt>
            <dd>{new Date(user.birthDate).toLocaleDateString()}</dd>

            <dt>Téléphone :</dt>
            <dd>{user.phone}</dd>

            <dt>Handicap :</dt>
            <dd>{user.handicap}</dd>

          </dl>
        </section>

        <section className={style.activityUser}>
          <h3>Vos activités</h3>
          <ul className={style.activitiesList}>
            {activitiesUser ? activitiesUser.map((a) => renderUserActivity(a)) : null}
          </ul>
        </section>

      </div>

      <section>
        <h3>PELZ stat</h3>
      </section>


    </main>
  );
}

export default AccountPage;