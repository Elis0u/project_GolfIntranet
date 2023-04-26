import React, { useState, useEffect } from "react";
import moment from "moment";
import "moment/locale/fr";
import { getDatas } from "../../services/api.js";
import style from "./calendar.module.css";
import { IoLocationOutline } from "react-icons/io5";
import { IoGolfOutline } from "react-icons/io5";
import { formatDateAndTime } from './utils';
import GenerateCalendar from "./Components/GenerateCalendar.jsx";
import loader from "../../assets/img/loader.svg";
import { Helmet } from 'react-helmet';

function Calendar() {
  const [events, setEvents] = useState([]);
  const [currentDate, setCurrentDate] = useState(moment());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const eventsData = await getDatas("/events");
        setEvents(eventsData.data.result);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        throw new Error(err);
      }
    }
    fetchData();
  }, []);

  const handlePrevMonth = () => {
    setCurrentDate(moment(currentDate).subtract(1, "month"));
  };

  const handleNextMonth = () => {
    setCurrentDate(moment(currentDate).add(1, "month"));
  };

  const renderLoader = () => {
    return (
      <div className="loader">
        <img src={loader} alt="Loading" />
      </div>
    );
  };

  return (
    <>
      <Helmet>
        <title>Calendrier - Equipe femme de Granville</title>
      </Helmet>

      <main>
        <section className={style.calendar}>
          <h2 className={style.header}>Calendrier de l'équipe</h2>
          <div className={style.navigation}>
            <button onClick={handlePrevMonth} className={style.previous}>
              &lt;
            </button>
            <p>{currentDate.format("MMMM YYYY")}</p>
            <button onClick={handleNextMonth} className={style.next}>
              &gt;
            </button>
          </div>
          <div className={style.weekdays}>
            <span>Lundi</span>
            <span>Mardi</span>
            <span>Mercredi</span>
            <span>Jeudi</span>
            <span>Vendredi</span>
            <span>Samedi</span>
            <span>Dimanche</span>
          </div>
          <div className={style.days}>
            {GenerateCalendar(events, currentDate, isLoading)}
          </div>
        </section>

        <section className={style.eventMobil}>
          <h2>Calendrier</h2>
          {isLoading ? (
            renderLoader()
          ) : (
            events.map((e) => (
              <article key={e.id} className={style.events}>
                <h3>
                  <IoGolfOutline /> {e.title} ({e.label})
                </h3>
                <p className={style.location}>
                  <IoLocationOutline /> {e.location} -{" "}
                  {formatDateAndTime(e.startEvent, e.endEvent)}
                </p>
              </article>
            ))
          )}
        </section>
      </main>
    </>
  );
}

export default Calendar;