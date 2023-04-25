import React from "react";
import moment from "moment";
import loader from "../../../assets/img/loader.svg";

function RenderEvents(date, events, isLoading) {
  if (isLoading) {
    return <div><img src={loader} alt="Loading..." /></div>;
  }
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

export default RenderEvents;