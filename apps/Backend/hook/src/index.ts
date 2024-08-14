import { prisma } from '../../../../packages/database/src/client';
import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3002;

app.use(express.json());

app.use(cors({
    origin: '*', // Allow all origins
}));

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, TypeScript with Express!');
});

app.post("/hooks/catch/:userId/:zapId", async (req: Request, res: Response) => {
    const userId = req.params.userId;
    const zapId = req.params.zapId;
    const body = req.body;

    try {
        // Fetch the zap information to log the trigger metadata
        const zap = await prisma.zap.findUnique({
            where: { id: zapId },
            include: {
                trigger: true, // Include trigger information
            }
        });

        if (zap && zap.trigger) {
            // Log the trigger metadata
            console.log(`Trigger Metadata for Zap ID ${zapId}:`, zap.trigger.metadata);
        } else {
            console.log(`No trigger found for Zap ID ${zapId}`);
        }

        // Store the webhook data and create the necessary entries in the database
        await prisma.$transaction(async tx => {
            const run = await tx.zapRun.create({
                data: {
                    zapId: zapId,
                    metadata: body
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
    console.log(`Server is running on port ${PORT}`);
});