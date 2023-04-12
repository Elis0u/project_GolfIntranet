import express from 'express';
import "dotenv/config";
import cors from "cors"

import {PORT, HOST} from './config/const.js';
import router from './router/index.routes.js';

const app = express();

app
    .use(express.static("public"))
    .use(express.json())
    .use(express.urlencoded({extended: true}))
    .use(cors());

    const getDurationInMilliseconds = (start) => {
        const NS_PER_SEC = 1e9
        const NS_TO_MS = 1e6
        const diff = process.hrtime(start)
    
        return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS
    }
        
    app.use(router);
    
    app.listen(PORT, () => console.log(`Listening at http://${HOST}:${PORT}`))