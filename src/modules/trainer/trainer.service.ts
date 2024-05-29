import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class TrainerService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createTrainerDto: Prisma.trainersCreateInput) {
    return this.databaseService.trainers.create({
      data: createTrainerDto,
    });
  }

  async findAll() {
    return this.databaseService.trainers.findMany();
  }

  async findOne(id: number) {
    return this.databaseService.trainers.findUnique({
      where: {
        trainer_id: id,
      },
    });
  }

  async update(id: number, updateTrainerDto: Prisma.trainersUpdateInput) {
    return this.databaseService.trainers.update({
      where: {
        trainer_id: id,
      },
      data: updateTrainerDto,
    });
  }

  async remove(id: number) {
    return this.databaseService.trainers.delete({
      where: {
        trainer_id: id,
      },
    });
  }
}
