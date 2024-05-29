import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseService } from './database/database.service';
import { DatabaseModule } from './database/database.module';
import { AdminModule } from './modules/admin/admin.module';
import { AuthModule } from './modules/auth/auth.module';
import { SkillModule } from './modules/skill/skill.module';
import { TrainerModule } from './modules/trainer/trainer.module';
import { RegistrationModule } from './modules/registration/registration.module';
import { StudentModule } from './modules/student/student.module';
import { PaymentModule } from './modules/payment/payment.module';

@Module({
  imports: [
    DatabaseModule,
    AdminModule,
    AuthModule,
    SkillModule,
    TrainerModule,
    RegistrationModule,
    StudentModule,
    PaymentModule,
  ],
  controllers: [AppController],
  providers: [AppService, DatabaseService],
})
export class AppModule {}
