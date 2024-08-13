import { prisma } from './../../../../packages/database/src/client';
import { Kafka } from 'kafkajs';
import express, { Request, Response } from 'express';

const app = express();
const port = 3004;
app.use(express.json());


const TOPIC_NAME = "zapout"

const kafka = new Kafka({
    clientId: 'outbox-processor-2',
    brokers: ['localhost:9092']
})

async function main() {
  const consumer=kafka.consumer({groupId:"main-worker-2"});
  await consumer.connect();
  const producer=kafka.producer();
  await producer.connect();
  await consumer.subscribe({topic:TOPIC_NAME,fromBeginning:true});

  await consumer.run({
    autoCommit:false,
    eachMessage:async({topic,partition,message})=>{
      console.log({
        partition,
        offset:message.offset,
        value:message.value?.toString()
      })
      if(!message.value?.toString()){
        return;
      }
      const parsedValue=JSON.parse(message.value?.toString())
      const zaprunid=parsedValue.zapRunId;
      const stage=parsedValue.stage;

      const zapRunDetails=await prisma.zapRun.findFirst({
        where:{
          id:zaprunid
        },
        include:{
          zap:{
            include:{
              actions:{
                include:{
                  type:true
                }
              }
            }
          }
        }
      });
      
      const currentAction = zapRunDetails?.zap.actions.find(x => x.sortingOrder === stage);

      if (!currentAction) {
        console.log("Current action not found?");
        return;
      }

      const zapRunMetadata = zapRunDetails?.metadata;

      console.log(zapRunDetails)
    }
  })
}



app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

main()