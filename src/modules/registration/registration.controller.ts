import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
  UseGuards,
  HttpException,
} from '@nestjs/common';
import { RegistrationService } from './registration.service';
import { registrations as RegModel } from '@prisma/client';
import { Role } from 'src/enums/role.enum';
import { Roles } from 'src/common/decorators/roles.decorator';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';

@Controller('registrations')
export class RegistrationController {
  constructor(private readonly registrationService: RegistrationService) {}

  @Roles(Role.User, Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Post()
  async create(
    @Body() regData: { student_id: number; skill_id: number },
  ): Promise<RegModel> {
    const { student_id, skill_id } = regData;

    return this.registrationService.create({
      student: {
        connect: { student_id: student_id },
      },
      skill: {
        connect: { skill_id: skill_id },
      },
    });
  }

  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Get()
  findAll(): Promise<RegModel[]> {
    return this.registrationService.findAll({
      include: { skill: true, student: true },
    });
  }

  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<RegModel> {
    return this.registrationService.findOne({ registration_id: id });
  }
}
