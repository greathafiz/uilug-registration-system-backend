import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { HttpModule } from '@nestjs/axios';
import { PaymentController } from './payment.controller';
import { StudentModule } from '../student/student.module';
import { SkillModule } from '../skill/skill.module';
import { RegistrationModule } from '../registration/registration.module';

@Module({
  imports: [
    HttpModule.register({
      timeout: 10000,
      maxRedirects: 5,
      baseURL: 'https://api.paystack.co',
    }),
    StudentModule,
    SkillModule,
    RegistrationModule,
  ],
  providers: [PaymentService],
  exports: [PaymentService],
  controllers: [PaymentController],
})
export class PaymentModule {}
