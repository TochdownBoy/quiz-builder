import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class QuizzesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.quiz.findMany({ include: { questions: true } });
  }

  async findOne(id: string) {
    const quiz = await this.prisma.quiz.findUnique({
      where: { id },
      include: { questions: true },
    });
    if (!quiz) {
      throw new NotFoundException(`Quiz with id "${id}" not found`);
    }
    return quiz;
  }

  async create(data: { title: string }) {
    return this.prisma.quiz.create({ data });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.quiz.delete({ where: { id } });
  }
}
