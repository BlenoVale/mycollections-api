import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';

import { mongoConnect } from './database/mongo';
import apiRaoutes from '../src/routes/routes';

dotenv.config();
mongoConnect();

const server = express();
server.use(cors());

server.use(express.static(path.join(__dirname, '../public')));

// body-parse - habilita tipos diferente request
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.use('/', apiRaoutes);

server.listen(process.env.PORT, ()=> {
    console.log(`Rodando no endereço: ${process.env.BASE}`);
});



