import { Module } from '@nestjs/common';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
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
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    DatabaseService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
