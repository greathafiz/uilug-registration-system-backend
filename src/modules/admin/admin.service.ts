import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class AdminService {
  constructor(private readonly databaseService: DatabaseService) {}
  findOne(username: string) {
    return this.databaseService.admins.findUnique({
      where: {
        username: username,
      },
    });
  }
}
