import React from "react";
import moment from "moment";
import loader from "../../../assets/img/loader.svg";
import { IoLocationOutline } from "react-icons/io5";

const RenderEvents = (date, events, isLoading) => {

  if (isLoading) {
    return <div><img src={loader} alt="Loading..." /></div>;
  }

  // Filter events to include only those occurring on the specified day
  const eventList = events.filter((event) => {
    const eventStartDate = moment(event.startEvent);
    const eventEndDate = moment(event.endEvent);
    return date.isBetween(eventStartDate, eventEndDate, "day", "[]");
  });

  // Returns a filtered list of events with details of each event
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
            <span><IoLocationOutline /> {event.location}</span>
          </li>
        );
      })}
    </ul>
  );
};

export default RenderEvents;