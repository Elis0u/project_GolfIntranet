import { success } from "../helpers/index.js";
import Query from "../model/query.js";
import axios from "axios";

const { API_WEATHER_KEY } = process.env;

export const lastActivities = async (req, res) => {
    try {
        const query = "SELECT 'document' as type, id, title, createdAt FROM document UNION ALL SELECT 'event' as type, id, title, createdAt FROM event ORDER BY createdAt DESC LIMIT 5";
        const [activities] = await Query.find(query);
        if (activities.length) {
            const msg = "Recovery of five last activities";
            res.status(200).json(success(msg, activities));
        } else {
            const msg = "No yet last activity in database";
            res.status(200).json(success(msg));
        }
    } catch (err) {
        res.status(500).json({ err: 'An error occurred while processing your request.' });
    }
}

export const nextEvent = async (req, res) => {
    try {
        const query = "SELECT event.id, title, location, startEvent, endEvent FROM event INNER JOIN category_event ON event.category_id = category_event.id WHERE category_event.label = 'Entraînement' AND endEvent >= CURRENT_DATE ORDER BY endEvent ASC LIMIT 1";
        const [nextEvent] = await Query.find(query);
        if (nextEvent.length) {
            const msg = "Recovery next event where category is training";
            res.status(200).json(success(msg, nextEvent));
        } else {
            const msg = "No yet event";
            res.status(200).json(success(msg))
        }
    } catch (err) {
        res.status(500).json({ err: 'An error occurred while processing your request.' });
    }
}

export const fourEvents = async (req, res) => {
    try {
        const query = "SELECT event.id, title, location, startEvent, endEvent, label FROM event JOIN category_event ON category_id = category_event.id WHERE endEvent >= CURRENT_DATE ORDER BY startEvent ASC LIMIT 4";
        const [nextEvent] = await Query.find(query);
        if (nextEvent.length) {
            const msg = "Recovery five event ";
            res.status(200).json(success(msg, nextEvent));
        } else {
            const msg = "No yet event";
            res.status(200).json(success(msg))
        }
    } catch (err) {
        res.status(500).json({ err: 'An error occurred while processing your request.' });
    }
}

export const weather = async (req, res) => {
    try {
      const city = req.query.city;
      const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_WEATHER_KEY}&units=metric&lang=fr`);
      res.status(200).json(response.data);
    } catch (error) {
      res.status(500).json({ err: 'An error occurred while processing your request.' });
    }
  };