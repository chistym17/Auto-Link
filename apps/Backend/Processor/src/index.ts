import { prisma } from './../../../../packages/database/src/client';
import express, { Request, Response } from 'express';

const app = express();
const PORT = process.env.PORT || 3002;

import {Kafka} from "kafkajs";

const TOPIC_NAME = "zap-events"


const kafka = new Kafka({
    clientId: 'outbox',
    brokers: ['localhost:9092']
})


app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Express!');
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});