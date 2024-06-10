import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { SkillService } from './skill.service';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { Role } from 'src/enums/role.enum';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Prisma } from '@prisma/client';

@Controller('skills')
export class SkillController {
  constructor(private readonly skillService: SkillService) {}

  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Post()
  create(
    @Body()
    {
      skill_name,
      description,
      slots,
      trainer_id,
    }: Prisma.skillsUncheckedCreateInput,
  ) {
    return this.skillService.create({
      skill_name: skill_name,
      description: description,
      slots: slots,
      trainer: {
        connect: { trainer_id: trainer_id },
      },
    });
  }

  @Get()
  findAll(@Query('name') name?: string) {
    return this.skillService.findAll(name);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.skillService.findOne(id);
  }

  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSkillDto: Prisma.skillsUpdateInput,
  ) {
    return this.skillService.update(id, updateSkillDto);
  }

  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.skillService.remove(id);
  }
}
