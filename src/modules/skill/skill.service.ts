import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class SkillService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createSkillDto: Prisma.skillsCreateInput) {
    return this.databaseService.skills.create({
      data: createSkillDto,
    });
  }

  async findAll(name: string) {
    return this.databaseService.skills.findMany({
      where: {
        skill_name: name,
      },
      include: {
        trainer: true,
      },
    });
  }

  async findOne(id: number) {
    const skill = await this.databaseService.skills.findUnique({
      where: {
        skill_id: id,
      },
      include: { trainer: true },
    });

    if (!skill) {
      throw new HttpException(
        `No skill with the id ${id}`,
        HttpStatus.NOT_FOUND,
      );
    }
    return skill;
  }

  async update(id: number, updateSkillDto: Prisma.skillsUpdateInput) {
    return this.databaseService.skills.update({
      where: {
        skill_id: id,
      },
      data: updateSkillDto,
    });
  }

  async reduceSlot(skill_id: number) {
    return this.databaseService.skills.update({
      where: {
        skill_id,
      },
      data: {
        slots: {
          decrement: 1,
        },
      },
    });
  }

  async remove(id: number) {
    return this.databaseService.skills.delete({
      where: {
        skill_id: id,
      },
    });
  }
}
