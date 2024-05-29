import { Injectable } from '@nestjs/common';
import { Prisma, students } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class StudentService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.studentsWhereUniqueInput;
    where?: Prisma.studentsWhereInput;
    orderBy?: Prisma.studentsOrderByWithRelationInput;
  }): Promise<students[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.databaseService.students.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async findOne(
    studentsWhereUniqueInput: Prisma.studentsWhereUniqueInput,
  ): Promise<students | null> {
    return this.databaseService.students.findUnique({
      where: studentsWhereUniqueInput,
    });
  }
}
