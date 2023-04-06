import React, { useState, useEffect } from 'react';
import { getDatas } from '../../../services/api.js';
import style from '../home.module.css';
import { IoLocationOutline } from "react-icons/io5";
import { IoGolfOutline } from "react-icons/io5";

function Event() {
    const [events, setEvents] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const events = await getDatas('/home/fourEvents');
                setEvents(events.data.result);
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
            {events ? (
                events.map((e) =>
                    <article className={style.events}>
                        <h3><IoGolfOutline /> {e.title} ({e.label})</h3>
                        <p className={style.location}><IoLocationOutline /> {e.location} - {formatDateAndTime(e.startEvent, e.endEvent)}</p>
                    </article>
                )
            ) : <p>Aucun evenement enregistré</p>}
        </>
    );
}

export default Event;