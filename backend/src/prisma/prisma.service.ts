import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@/generated/prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super({
      adapter: new PrismaPg({ connectionString: DATABASE_URL }),
    });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}

export const DATABASE_URL =
  `postgresql://${process.env.POSTGRES_USER}:` +
  `${process.env.POSTGRES_PASSWORD}@` +
  `${process.env.POSTGRES_HOST}:` +
  `${process.env.POSTGRES_PORT}/` +
  `${process.env.POSTGRES_DATABASE}`;
