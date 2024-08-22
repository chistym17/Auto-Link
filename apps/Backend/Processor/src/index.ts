import { prisma } from './../../../../packages/database/src/client';
import express, { Request, Response } from 'express';

const app = express();
const PORT = 3003;
app.use(express.json());

import {Kafka} from "kafkajs";

const TOPIC_NAME = "zapout"


const kafka = new Kafka({
    clientId: 'outbox',
    brokers: ['localhost:9092']
})


async function main() {
    const producer =  kafka.producer();
    await producer.connect();

    while(1) {
        const pendingRows = await prisma.zapRunOutbox.findMany({
            where :{},
            take: 10
        })
        console.log(pendingRows);

        producer.send({
            topic: TOPIC_NAME,
            messages: pendingRows.map(r => {
                return {
                    value: JSON.stringify({ zapRunId: r.zapRunId, stage: 0 })
                }
            })
        })  

        await prisma.zapRunOutbox.deleteMany({
            where: {
                id: {
                    in: pendingRows.map(x => x.id)
                }
            }
        })

        await new Promise(r => setTimeout(r, 3000));
    }
}


main()



app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Express!');
});


app.listen(PORT, () => {
  console.log(`processor is running on port ${PORT}`);
});