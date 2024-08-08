// @ts-nocheck
import { prisma } from './../../../../packages/database/src/client';
import express, { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import cors from 'cors';
const app = express();
const port = 3001;

async function main() {
  // Create available triggers
  const triggers = [
      { id: "trigger_1", name: "New Form Submission", image: "/images/form.png" },
      { id: "trigger_2", name: "New Email Received", image: "/images/email.png" }
  ];

  for (const trigger of triggers) {
      await prisma.availableTrigger.create({
          data: {
              id: trigger.id,
              name: trigger.name,
              image: trigger.image
          }
      });
  }

  // Create available actions
  const actions = [
      { id: "action_1", name: "Send Email", image: "/images/send_email.png" },
      { id: "action_2", name: "Send Solana", image: "/images/solana.png" }
  ];

  for (const action of actions) {
      await prisma.availableAction.create({
          data: {
              id: action.id,
              name: action.name,
              image: action.image
          }
      });
  }

  console.log('Available triggers and actions have been created.');
}



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
app.post("/createzap", async (req, res) => {
  const body = req.body;

  try {
      const { availableTriggerId, triggerMetadata, actions } = body;

      // Create zap and actions within a transaction
      const zapId = await prisma.$transaction(async (tx) => {
          // Create Zap
          const zap = await tx.zap.create({
              data: {
                  userId: 1, // Replace with actual user ID
                  triggerId: '', // This will be updated with the actual trigger ID later
                  actions: {
                      create: actions.map((action: any, index: number) => ({
                          metadata: action.actionMetadata,
                          sortingOrder: index,
                          type: {
                              connect: { id: action.availableActionId }, // Connect to the AvailableAction model
                          },
                      })),
                  },
              },
          });

          // Create Trigger
          const trigger = await tx.trigger.create({
              data: {
                  zapId: zap.id,
                  triggerId: availableTriggerId,
                  metadata: triggerMetadata,
                 
              },
          });

          // Update Zap with triggerId
          await tx.zap.update({
              where: { id: zap.id },
              data: { triggerId: trigger.id },
          });

          return zap.id;
      });

        // Construct the webhook URL
        const webhookUrl = `${req.protocol}://${req.get('host')}/hooks/catch/${1}/${zapId}`;

        // Send the URL back to the user
        res.json({ success: true, zapId, webhookUrl });

      // res.json({ zapId });
  } catch (error) {
      console.error('Error creating zap:', error);
      res.status(500).json({ message: 'Internal Server Error' });
  }
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
