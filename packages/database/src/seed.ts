import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create some AvailableTriggers
  const availableTrigger1 = await prisma.availableTrigger.create({
    data: {
      name: 'New Email Received',
      image: 'email.png',
    },
  });

  const availableTrigger2 = await prisma.availableTrigger.create({
    data: {
      name: 'New File Uploaded',
      image: 'file.png',
    },
  });

  // Create some AvailableActions
  const availableAction1 = await prisma.availableAction.create({
    data: {
      name: 'Send Email',
      image: 'send_email.png',
    },
  });

  const availableAction2 = await prisma.availableAction.create({
    data: {
      name: 'Create Task',
      image: 'task.png',
    },
  });

  // Create a User
  const user = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'securepassword', // In practice, hash the password before storing
      zaps: {
        create: [
          {
            triggerId: 'trigger-1',
            trigger: {
              create: {
                // zapId: 'zap-1',
                triggerId: availableTrigger1.id,
                metadata: {},
              },
            },
            actions: {
              create: [
                {
                  actionId: availableAction1.id,
                  metadata: {},
                  sortingOrder: 0,
                },
              ],
            },
          },
        ],
      },
    },
  });

  console.log({ availableTrigger1, availableTrigger2, availableAction1, availableAction2, user });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
