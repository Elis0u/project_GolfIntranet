import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import style from "./accountPage.module.css";
import { AiOutlineEdit, AiOutlinePlus } from "react-icons/ai";
import { getDatas } from '../../services/api.js';
import { Line } from 'react-chartjs-2';
import { Chart } from "chart.js";
import { TimeScale } from "chart.js/auto";
import "chartjs-adapter-date-fns";
import { formatISO } from 'date-fns';
import FormModal from './Components/Modal/FormModal';
import AddPelzModal from './Components/Modal/AddPelzModal';
import Loader from "../../assets/img/loader.svg";
import { Helmet } from 'react-helmet';

Chart.register(TimeScale);

const AccountPage = () => {
  const user = useSelector((state) => state.user.infos);
  const [activitiesUser, setActivitiesUser] = useState(null);
  const [pelzScores, setPelzScores] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formModalIsOpen, setFormModalIsOpen] = useState(false);
  const [formPelzModalIsOpen, setFormPelzModalIsOpen] = useState(false);

  useEffect(() => {
    if (user.id) {
      async function fetchData() {
        try {
          const activitiesUser = await getDatas(`/user/activities_user?userId=${user.id}`);
          const pelzScores = await getDatas(`/pelz/allPelzScoreByUser?userId=${user.id}`);
          setActivitiesUser(activitiesUser.data.result);
          setPelzScores(pelzScores.data.result);
          setIsLoading(false);
        } catch (error) {
          throw new Error(error);
        }
      }
      fetchData();
    }
  }, [user.id]);

  const openFormModal = () => {
    setFormModalIsOpen(true);
  };

  const closeFormModal = () => {
    setFormModalIsOpen(false);
  };

  const openFormPelzModal = () => {
    setFormPelzModalIsOpen(true);
  };

  const closeFormPelzModal = () => {
    setFormPelzModalIsOpen(false);
  };

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

  const getChartData = () => {
    const scores = pelzScores.slice(-10).map((score) => score.score);
    const dates = pelzScores
      .slice(-10)
      .map((score) => formatISO(new Date(score.createdAt)));

    return {
      labels: dates,
      datasets: [
        {
          label: 'Score pelz ',
          data: scores,
          fill: false,
          backgroundColor: 'rgb(159, 196, 144)',
          borderColor: 'rgba(19, 64, 116, 0.8)',
        },
      ],
    };
  };

  const chartOptions = {
    scales: {
      x: {
        type: "time",
        display: true,
        title: {
          display: true,
          text: "Date",
        },
        time: {
          unit: "month",
          displayFormats: {
            day: "MMM dd",
          },
        },
      },
      y: {
        type: "linear",
        display: true,
        title: {
          display: true,
          text: "Score",
        },
      },
    },
  };

  return (
    <>
      <Helmet>
        <title>Mon compte - Equipe femme de Granville</title>
      </Helmet>

      <main className={style.ctnDashboard}>
        <h2>DashBoard {user.firstName}</h2>

        <div className={style.ctnSection}>

          <section className={style.userInfo}>
            <button className={style.btnEdit} onClick={openFormModal}><AiOutlineEdit /></button>
            <h3>Vos informations</h3>
            {isLoading ? (
              <div className="loader">
                <img src={Loader} alt="Chargement des informations utilisateur..." />
              </div>
            ) : (

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
            )}
          </section>

          <section className={style.activityUser}>
            <h3>Vos actualités</h3>
            {isLoading ? (
              <div className="loader">
                <img src={Loader} alt="Chargement des activités utilisateur..." />
              </div>
            ) : (
              <ul className={style.activitiesList}>
                {activitiesUser ? activitiesUser.map((a) => renderUserActivity(a)) : "Vous n'avez pas encore d'actualité"}
              </ul>
            )}
          </section>

        </div>

        <section className={style.pelzSection}>
          <h3>PELZ stat</h3>
          <button className={style.btnAddPelz} onClick={openFormPelzModal}><AiOutlinePlus /></button>
          {isLoading ? (
            <div className="loader"><img src={Loader} alt="Chargement des données..." /></div>
          ) : pelzScores ? (
            <Line className={style.pelzChart} data={getChartData()} options={chartOptions} />
          ) : (
            <p>Aucune donnée disponible</p>
          )}
        </section>

        <FormModal
          formModalIsOpen={formModalIsOpen}
          closeFormModal={closeFormModal}
          initialData={user}
          onSubmitSuccess={closeFormModal}
        />
        <AddPelzModal
          formModalIsOpen={formPelzModalIsOpen}
          closeFormModal={closeFormPelzModal}
          onSubmitSuccess={closeFormPelzModal}
        />

      </main>
    </>
  );
}

export default AccountPage;