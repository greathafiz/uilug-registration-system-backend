import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  UseGuards,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { Prisma } from '@prisma/client';
import { SkillService } from '../skill/skill.service';
import { StudentService } from '../student/student.service';
import { RegistrationService } from '../registration/registration.service';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { InitializePaymentDto } from './dto/initialize-payment.dto';

@Controller('payments')
export class PaymentController {
  constructor(
    private readonly paymentService: PaymentService,
    private readonly skillService: SkillService,
    private readonly studentService: StudentService,
    private readonly registrationService: RegistrationService,
  ) {}

  @Roles(Role.User)
  @UseGuards(AuthGuard, RolesGuard)
  @Post('initialize')
  async initializePayment(@Body() initializePaymentDto: InitializePaymentDto) {
    const { student_id, skill_id } = initializePaymentDto;
    try {
      const user = await this.studentService.findOne({
        student_id,
      });
      const skill = await this.skillService.findOne(skill_id);
      // console.log('User object:', user); // Log user object to verify properties

      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      if (!skill) {
        throw new HttpException(
          `No skill with id ${skill_id}`,
          HttpStatus.NOT_FOUND,
        );
      }

      const paymentData = await this.paymentService.initializePayment(
        user,
        skill_id,
      );

      return paymentData;
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to initialize payment',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('callback')
  async handleCallback(@Query('reference') reference: string) {
    try {
      const result = await this.paymentService.verifyPayment(reference);
      // console.log(result);

      if (result.data.status === 'success') {
        // Extract metadata
        const studentId = +result.data.metadata.student_id;
        const skillId = +result.data.metadata.skill_id;

        const registration = await this.registrationService.create({
          student: {
            connect: { student_id: studentId },
          },
          skill: {
            connect: { skill_id: skillId },
          },
        });
        await this.skillService.reduceSlot(skillId);
        return registration;
      } else {
        throw new HttpException(
          'Payment verification failed',
          HttpStatus.PAYMENT_REQUIRED,
        );
      }
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
