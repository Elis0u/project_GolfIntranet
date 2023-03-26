import React, { useState, useEffect } from "react";
import moment from "moment";
import "moment/locale/fr";
import { getDatas } from "../../services/api.js";
import style from "./calendar.module.css";

function Calendar() {
  const [events, setEvents] = useState([]);
  const [currentDate, setCurrentDate] = useState(moment());

  useEffect(() => {
    async function fetchData() {
      try {
        const eventsData = await getDatas("/events");
        setEvents(eventsData.data.result);
      } catch (err) {
        throw new Error(err);
      }
    }
    fetchData();
  }, []);

  
  // Fonction pour afficher les événements sur le calendrier
  const renderEvents = (date) => {
    const eventList = events.filter((event) => {
      const eventStartDate = moment(event.startEvent);
      const eventEndDate = moment(event.endEvent);
      return date.isBetween(eventStartDate, eventEndDate, "day", "[]");
    });
    return (
      <ul>
        {eventList.map((event) => {
          const eventStartDate = moment(event.startEvent);
          const eventEndDate = moment(event.endEvent);
          const isMultiDayEvent = !eventStartDate.isSame(eventEndDate, "day");
          return (
            <li key={event.id}>
              <span>
              {eventStartDate.isSame(date, "day") ? moment(event.startEvent).format("LT") : ""}
              {!isMultiDayEvent ? ` - ${moment(event.endEvent).format("LT")}` : ""}
              {isMultiDayEvent && eventEndDate.isSame(date, "day") ? ` Fini à ${moment(event.endEvent).format("LT")}` : ""}
              </span>
              <span>{event.title}</span>
              <span>{event.description}</span>
            </li>
          );
        })}
      </ul>
    );
  };
  
  function isToday(date) {
    return moment().isSame(moment(date), "day");
  }
  // Générer les jours du calendrier
  const generateCalendar = () => {
    const calendar = [];
    if (events.length > 0) {
      const startDate = moment(currentDate)
        .startOf("month")
        .startOf("week");
      const endDate = moment(currentDate).endOf("month").endOf("week");
      let day = startDate;
      while (day.isBefore(endDate)) {
        calendar.push(
          <div key={day.format("L")} className={style.day} >
            <span className={`${isToday(day) ? style.today : " "}`}>{day.format("D")}</span>
            {renderEvents(day)}
          </div>
        );
        day = day.add(1, "day");
      }
    }
    return calendar;
  };

  const handlePrevMonth = () => {
    setCurrentDate(moment(currentDate).subtract(1, "month"));
  };

  const handleNextMonth = () => {
    setCurrentDate(moment(currentDate).add(1, "month"));
  };

  return (
    <main>
      <section className={style.calendar}>
        <h2 className={style.header}>Calendrier de l'équipe</h2>
        <div className={style.navigation}>
          <button onClick={handlePrevMonth} className={style.previous}>&lt;</button>
          <p>{currentDate.format("MMMM YYYY")}</p>
          <button onClick={handleNextMonth} className={style.next}>&gt;</button>
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
        <div className={style.days}>{generateCalendar()}</div>
      </section>
    </main>
  );
}

export default Calendar;