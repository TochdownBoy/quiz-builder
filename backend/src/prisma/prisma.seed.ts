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
            text: 'Is this a sample quiz?',
            order: 0,
            type: 'BOOLEAN',
            correctAnswer: true,
          },
          {
            text: 'What is the capital of France?',
            order: 1,
            type: 'INPUT',
            answer: 'Paris',
          },
          {
            text: 'Which numbers are even?',
            order: 2,
            type: 'CHECKBOX',
            options: {
              create: [
                { text: '1', isCorrect: false, order: 0 },
                { text: '2', isCorrect: true, order: 1 },
                { text: '3', isCorrect: false, order: 2 },
                { text: '4', isCorrect: true, order: 3 },
              ],
            },
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
