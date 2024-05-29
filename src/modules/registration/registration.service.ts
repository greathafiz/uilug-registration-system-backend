import { Injectable } from '@nestjs/common';
import { Prisma, registrations } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class RegistrationService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(data: Prisma.registrationsCreateInput) {
    return this.databaseService.registrations.create({ data });
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.registrationsWhereUniqueInput;
    where?: Prisma.registrationsWhereInput;
    orderBy?: Prisma.registrationsOrderByWithRelationInput;
    include?: Prisma.registrationsInclude;
  }): Promise<registrations[]> {
    const { skip, take, cursor, where, orderBy, include } = params;
    return this.databaseService.registrations.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include,
    });
  }

  async findOne(
    registrationsWhereUniqueInput: Prisma.registrationsWhereUniqueInput,
  ): Promise<registrations | null> {
    return this.databaseService.registrations.findUnique({
      where: registrationsWhereUniqueInput,
      include: {
        skill: true,
        student: true,
      },
    });
  }
}
