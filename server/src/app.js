import express from 'express';
import "dotenv/config";
import cors from "cors"

import {PORT} from './config/const.js';
import router from './router/index.routes.js';

const app = express();

app
    .use(express.static("public"))
    .use(express.json())
    .use(express.urlencoded({extended: true}))
    .use(cors());
        
    app.use(router);
    
    app.listen(PORT)