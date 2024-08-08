// @ts-nocheck
import { prisma } from './../../../../packages/database/src/client';
import express, { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import cors from 'cors';
const app = express();
const port = 3001;

app.use(express.json());

app.use(cors({
  origin: '*', // Allow all origins
}));


app.post('/api/v1/user/signup', async (req: Request, res: Response) => {
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({ where: { email: email } });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const user = await prisma.user.create({
      data: {
        name,
        email: email,
        password: hashedPassword,
      },
    });

    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



// Create a new Zap
app.post("/", async (req, res) => {
    const id = req.body.userId; // Assuming `userId` is passed in the request body
    const body = req.body;

    const zapId = await prisma.$transaction(async tx => {
        const zap = await prisma.zap.create({
            data: {
                userId: parseInt(id),
                triggerId: "",
                actions: {
                    create: body.actions.map((x, index) => ({
                        actionId: x.actionId,
                        sortingOrder: index,
                        metadata: x.metadata
                    }))
                }
            }
        });

        const trigger = await tx.trigger.create({
            data: {
                triggerId: body.triggerId,
                zapId: zap.id,
            }
        });

        await tx.zap.update({
            where: {
                id: zap.id
            },
            data: {
                triggerId: trigger.id
            }
        });

        return zap.id;
    });

    return res.json({
        zapId
    });
});

// Get all Zaps for a user
app.get("/getzaps", async (req, res) => {
    const id = req.query.userId; // Assuming `userId` is passed as a query parameter

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

// Get a specific Zap by ID
app.get("/:zapId", async (req, res) => {
    const id = req.query.userId; // Assuming `userId` is passed as a query parameter
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
  console.log(`Server running at http://localhost:${port}`);
});
