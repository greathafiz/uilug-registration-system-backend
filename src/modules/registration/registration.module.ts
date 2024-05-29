import { Module } from '@nestjs/common';
import { RegistrationService } from './registration.service';
import { RegistrationController } from './registration.controller';
import { DatabaseModule } from 'src/database/database.module';
import { StudentModule } from '../student/student.module';

@Module({
  imports: [DatabaseModule, StudentModule],
  controllers: [RegistrationController],
  providers: [RegistrationService],
  exports: [RegistrationService],
})
export class RegistrationModule {}
