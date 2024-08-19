//@ts-nocheck
import { prisma } from './../../../../packages/database/src/client';
import { Kafka } from 'kafkajs';
import express, { Request, Response } from 'express';
import { sendEmail } from './sendemail';
import { addUser, testConnection } from './updatedb';
require('dotenv').config();
const axios = require('axios');


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


      if (currentAction?.type?.id === 'action_6') {
        const dbUrl = currentAction.metadata.dbUrl;
        const dbName = currentAction.metadata.dbName;
        const username = currentAction.metadata.username;
        const password = currentAction.metadata.password;
    
        const newUser = { // Mock user
            name: 'usersuccess',
            email: 'success@example.com',
            password: 'Test@1234'
        };
    
        const dbConfig = {
            dbUrl: dbUrl,
            dbName: dbName,
            username: username,
            password: password
        };
    
        try {
            const result = await addUser(newUser, dbConfig);
    
            if (result.error) {
                console.log("User not added:", result.error);
            } else {
                console.log("User added:", result);
            }
        } catch (error) {
            console.error("An error occurred while adding the user:", error);
        }
    }
    

    if (currentAction?.type?.id === 'action_1') {
      const to = currentAction.metadata.email;
      const body=currentAction.metadata.body
      console.log(to,body)
      const res=await sendEmail(to)
      console.log(res);
  
      // Now you can use dbUrl, dbName, username, and password as needed
  }


  const lastStage = (zapRunDetails?.zap.actions?.length || 1) - 1;
// console.log(lastStage);
// console.log(stage);

if (lastStage !== stage) {
  console.log("pushing back to the queue");
  await producer.send({
    topic: TOPIC_NAME,
    messages: [{
      value: JSON.stringify({
        stage: stage + 1,
        zapRunId
      })
    }]
  });
}

console.log("processing done");
await consumer.commitOffsets([{
  topic: TOPIC_NAME,
  partition: partition,
  offset: (parseInt(message.offset) + 1).toString()
}]);


    
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

// const dbConfig = {
//   dbUrl: 'localhost:5432',
//   dbName: 'turborepo',
//   username: 'root',
//   password: 'root'
// };

// const newUser = {
//   name: 'testuser',
//   email: 'testme@example.com',
//   password: 'Test@1234'
// };

// (async () => {
//   const result = await addUser(newUser,dbConfig);
  

//   if (result.error) {
//     console.log("Failed to send email:", result.error);
//   } else {
//     console.log("Email sent successfully:", result.data);
//   }
// })();





// (async () => {
//   const result = await addUser(newUser);
  

//   if (result.error) {
//     console.log("Failed to send email:", result.error);
//   } else {
//     console.log("Email sent successfully:", result.data);
//   }
// })();



