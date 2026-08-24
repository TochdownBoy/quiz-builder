// import { Test, TestingModule } from '@nestjs/testing';
// import { QuizzesService } from './quizzes.service';
// import { PrismaService } from '@/prisma/prisma.service';

// describe('QuizzesService', () => {
//   let service: QuizzesService;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [
//         QuizzesService,
//         {
//           provide: PrismaService,
//           useValue: {
//             quiz: {
//               findMany: jest.fn(),
//               findUnique: jest.fn(),
//               create: jest.fn(),
//               delete: jest.fn(),
//             },
//           },
//         },
//       ],
//     }).compile();

//     service = module.get<QuizzesService>(QuizzesService);
//   });

//   it('should be defined', () => {
//     expect(service).toBeDefined();
//   });
// });
