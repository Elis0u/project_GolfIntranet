import React from "react";
import moment from "moment";
import style from "../calendar.module.css";
import RenderEvents from "./RenderEvent.jsx"
import { isToday } from '../utils';

const GenerateCalendar = (events, currentDate, isLoading) => {
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
          {RenderEvents(day, events, isLoading)}
        </div>
      );
      day = day.add(1, "day");
    }
  }
  return calendar;
};

export default GenerateCalendar;