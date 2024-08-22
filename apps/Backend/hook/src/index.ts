//@ts-nocheck
import { prisma } from '../../../../packages/database/src/client';
import express, { Request, Response } from 'express';
import cors from 'cors';



const app = express();
const PORT = process.env.PORT || 3002;

app.use(express.json());

app.use(cors({
    origin: '*',
}));

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, TypeScript with Express!');
});

app.post("/hooks/catch/:userId/:zapId", async (req: Request, res: Response) => {
    const userId = req.params.userId;
    const zapId = req.params.zapId;
    const body = req.body;
    console.log(body)

    try {
        const zap = await prisma.zap.findUnique({
            where: { id: zapId },
            include: {
                trigger: true,
                actions: true
            }
        });

        console.log(zap?.actions?.[0].metadata)
        const bodydata = zap?.actions?.[0].metadata
        await prisma.$transaction(async tx => {
            const run = await tx.zapRun.create({
                data: {
                    zapId: zapId,
                    metadata: bodydata
                }
            });

            await tx.zapRunOutbox.create({
                data: {
                    zapRunId: run.id
                }
            });
        });

        res.json({
            message: "Webhook received"
        });

    } catch (error) {
        console.error('Error processing webhook:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`hook is running on port ${PORT}`);
});
