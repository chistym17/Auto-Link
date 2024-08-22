// @ts-nocheck
import { prisma } from './../../../../packages/database/src/client';
import express, { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import cors from 'cors';
import jwt from 'jsonwebtoken';
require('dotenv').config();
const app = express();
const port = 3001;
app.use(express.json());

app.use(cors({
    origin: '*',
}));


app.post('/signup', async (req: Request, res: Response) => {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        const existingUser = await prisma.user.findUnique({ where: { email: email } });
        if (existingUser) {
            return res.status(409).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                name,
                email: email,
                password: hashedPassword,
            },
        });



        const token = jwt.sign(
            { userId: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );


        res.status(201).json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});



app.post("/createzap", async (req, res) => {
    const body = req.body;

    try {
        const { availableTriggerId, triggerMetadata, actions } = body;
        const zapId = await prisma.$transaction(async (tx) => {
            const zap = await tx.zap.create({
                data: {
                    userId: 1,
                    triggerId: '',
                    actions: {
                        create: actions.map((action: any, index: number) => ({
                            metadata: action.actionMetadata,
                            sortingOrder: index,
                            type: {
                                connect: { id: action.availableActionId },
                            },
                        })),
                    },
                },
            });

            const trigger = await tx.trigger.create({
                data: {
                    zapId: zap.id,
                    triggerId: availableTriggerId,
                    metadata: triggerMetadata,

                },
            });

            await tx.zap.update({
                where: { id: zap.id },
                data: { triggerId: trigger.id },
            });

            return zap.id;
        });

        const webhookUrl = `http://localhost:3002/hooks/catch/1/${zapId}`;

        res.json({ success: true, zapId, webhookUrl });

    } catch (error) {
        console.error('Error creating zap:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.get("/getzaps", async (req, res) => {
    const id = req.query.userId;

    const zaps = await prisma.zap.findMany({
        where: {
            userId: parseInt(id)
        },
        include: {
            actions: {
                include: {
                    type: true
                }
            },
            trigger: {
                include: {
                    type: true
                }
            }
        }
    });

    return res.json({
        zaps
    });
});

app.get("/:zapId", async (req, res) => {
    const id = req.query.userId;
    const zapId = req.params.zapId;

    const zap = await prisma.zap.findFirst({
        where: {
            id: zapId,
            userId: parseInt(id)
        },
        include: {
            actions: {
                include: {
                    type: true
                }
            },
            trigger: {
                include: {
                    type: true
                }
            }
        }
    });


    return res.json({
        zap
    });
});

app.listen(port, () => {
    console.log(`pbackend running at http://localhost:${port}`);
});