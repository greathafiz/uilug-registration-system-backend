import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseService } from './database/database.service';
import { DatabaseModule } from './database/database.module';
import { AdminModule } from './modules/admin/admin.module';
import { AuthModule } from './modules/auth/auth.module';
import { SkillModule } from './modules/skill/skill.module';

@Module({
  imports: [DatabaseModule, AdminModule, AuthModule, SkillModule],
  controllers: [AppController],
  providers: [AppService, DatabaseService],
})
export class AppModule {}
