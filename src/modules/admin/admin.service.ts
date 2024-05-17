import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class AdminService {
  constructor(private readonly databaseService: DatabaseService) {}
  create(createAdminDto: CreateAdminDto) {
    // return 'This action adds a new admin';
    return this.databaseService.admins.create({
      data: createAdminDto,
    });
  }

  findAll() {
    return this.databaseService.admins.findMany();
  }

  findOne(username: string) {
    return this.databaseService.admins.findUnique({
      where: {
        username: username,
      },
    });
  }

  //   update(id: number, updateAdminDto: UpdateAdminDto) {
  //     return `This action updates a #${id} admin`;
  //   }

  //   remove(id: number) {
  //     return `This action removes a #${id} admin`;
  //   }
}
