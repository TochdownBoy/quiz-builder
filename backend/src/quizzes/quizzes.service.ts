import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@/generated/prisma/client';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateQuizDto } from './dto/create-quiz.dto';

const quizInclude = {
  questions: {
    orderBy: { order: 'asc' },
    include: { options: { orderBy: { order: 'asc' } } },
  },
} satisfies Prisma.QuizInclude;

@Injectable()
export class QuizzesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateQuizDto) {
    return this.prisma.quiz.create({
      data: {
        title: dto.title,
        questions: {
          create: dto.questions.map((question, index) => ({
            text: question.text,
            order: index,
            type: question.type,
            correctAnswer: question.correctAnswer ?? null,
            answer: question.answer ?? null,
            options: question.options
              ? {
                  create: question.options.map((option, optionIndex) => ({
                    text: option.text,
                    isCorrect: option.isCorrect,
                    order: optionIndex,
                  })),
                }
              : undefined,
          })),
        },
      },
      include: quizInclude,
    });
  }

  async findAll() {
    return this.prisma.quiz.findMany({
      include: quizInclude,
      orderBy: { createdAt: 'asc' },
    });
  }

  async findOne(id: string) {
    const quiz = await this.prisma.quiz.findUnique({
      where: { id },
      include: quizInclude,
    });
    if (!quiz) {
      throw new NotFoundException(`Quiz with id "${id}" not found`);
    }
    return quiz;
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.quiz.delete({ where: { id } });
  }
}
