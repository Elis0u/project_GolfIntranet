import React, { useState, useEffect } from 'react';
import { getDatas } from '../../../services/api.js';
// import style from '../home.module.css';
import { IoLocationOutline } from "react-icons/io5";
import { AiOutlineClockCircle } from "react-icons/ai";
import { IoGolfOutline } from "react-icons/io5";

function NextEvent() {
    const [nextEvent, setNextEvent] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const nextEvent = await getDatas('/home/nextEvent');
                console.log('next event : ', nextEvent.data.result);
                setNextEvent(nextEvent.data.result);
            } catch (error) {
                throw Error(error)
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

    return (
        <>
            {nextEvent ? (
                nextEvent.map((e) =>
                    <>
                        <p><IoGolfOutline /> {e.title}</p>
                        <p><IoLocationOutline /> {e.location}</p>
                        <p><AiOutlineClockCircle /> {formatDateAndTime(e.startEvent, e.endEvent)}</p>
                    </>
                )
            ) : <p>Aucun evenement à venir</p>}
        </>
    );
}

export default NextEvent;