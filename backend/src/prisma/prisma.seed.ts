import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@/generated/prisma/client';
import { DATABASE_URL } from '@/prisma/prisma.service';

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: DATABASE_URL }),
});

async function main() {
  await prisma.quiz.upsert({
    where: { id: 'seed-sample-quiz' },
    update: {},
    create: {
      id: 'seed-sample-quiz',
      title: 'Sample quiz',
      questions: {
        create: [
          {
            text: 'Is this a sample question?',
            options: ['Yes', 'No'],
            order: 1,
            questionType: 'BOOLEAN',
          },
          {
            text: 'What is your name?',
            options: [],
            order: 2,
            questionType: 'INPUT',
          },
        ],
      },
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
