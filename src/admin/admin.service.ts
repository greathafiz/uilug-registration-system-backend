import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class AdminService {
  constructor(private readonly databaseService: DatabaseService) {}
  create(createAdminDto: Prisma.adminsCreateInput) {
    // return 'This action adds a new admin';
    // if (createAdminDto.password.length < 8) {
    //   throw new Error('at least 8 characters');
    // }
    return this.databaseService.admins.create({
      data: createAdminDto,
    });
  }

  findAll() {
    return `This action returns all admin`;
  }

  findOne(id: number) {
    return `This action returns a #${id} admin`;
  }

  update(id: number, updateAdminDto: UpdateAdminDto) {
    return `This action updates a #${id} admin`;
  }

  remove(id: number) {
    return `This action removes a #${id} admin`;
  }
}
