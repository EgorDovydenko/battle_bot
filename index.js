import express from 'express';
import dotenv from 'dotenv';

import { startHandler } from './bot/handlers/start.js';
import { buyTicketHandler } from './bot/handlers/buyTicket.js';

dotenv.config();

startHandler();
buyTicketHandler();

const app = express();
app.listen(process.env.PORT, () => console.log('Server started'));
