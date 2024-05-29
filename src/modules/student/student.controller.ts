import { Get, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { StudentService } from './student.service';
import { students as StudentModel } from '@prisma/client';
import { Role } from 'src/enums/role.enum';
import { Roles } from 'src/common/decorators/roles.decorator';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';

@Controller('students')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Get()
  getAllStudents(): Promise<StudentModel[]> {
    return this.studentService.findAll({});
  }

  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Get(':id')
  getStudent(@Param('id', ParseIntPipe) id: number): Promise<StudentModel> {
    return this.studentService.findOne({ student_id: id });
  }
}
