import React, { useState, useEffect } from 'react';
import { getDatas } from '../../../services/api.js';
import { IoLocationOutline, IoGolfOutline } from "react-icons/io5";
import { AiOutlineClockCircle } from "react-icons/ai";
import loader from "../../../assets/img/loader.svg";

const NextEvent = () => {
  const [nextEvent, setNextEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const nextEvent = await getDatas('/home/nextEvent');
        setNextEvent(nextEvent.data.result);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        throw Error(error);
      }
    }

    fetchData();
  }, []);

  function formatDateAndTime(start, end) {
    const startDate = new Date(start);
    const endDate = new Date(end);

    if (startDate.toLocaleDateString() === endDate.toLocaleDateString()) {
      return `${startDate.toLocaleDateString()} ${startDate.toLocaleTimeString()} - ${endDate.toLocaleTimeString()}`;
    } else {
      return `${startDate.toLocaleString()} - ${endDate.toLocaleString()}`;
    }
  }

  const renderLoader = () => {
    return (
      <div className="loader">
        <img src={loader} alt="Loading" />
      </div>
    );
  };

  return (
    <>
      {isLoading ? (
        renderLoader()
      ) : nextEvent ? (
        nextEvent.map((e) => (
          <React.Fragment key={e.id}>
            <p>
              <IoGolfOutline /> {e.title}
            </p>
            <p>
              <IoLocationOutline /> {e.location}
            </p>
            <p>
              <AiOutlineClockCircle /> {formatDateAndTime(e.startEvent, e.endEvent)}
            </p>
          </React.Fragment>
        ))
      ) : (
        <p>Aucun evenement à venir</p>
      )}
    </>
  );
}

export default NextEvent;