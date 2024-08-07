import { prisma } from '../../../../packages/database/src/client';
import express, { Request, Response } from 'express';

const app = express();
const PORT = process.env.PORT || 3002;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Express!');
});



// https://hooks.zapier.com/hooks/catch/17043103/22b8496/
// password logic
app.post("/hooks/catch/:userId/:zapId", async (req, res) => {
    const userId = req.params.userId;
    const zapId = req.params.zapId;
    const body = req.body;

    // store in db a new trigger
    await prisma.$transaction(async tx => {
        const run = await tx.zapRun.create({
            data: {
                zapId: zapId,
                metadata: body
            }
        });;

        await tx.zapRunOutbox.create({
            data: {
                zapRunId: run.id
            }
        })
    })
    res.json({
        message: "Webhook received"
    })
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});