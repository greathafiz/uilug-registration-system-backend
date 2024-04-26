import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseService } from './database/database.service';
import { DatabaseModule } from './database/database.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [DatabaseModule, AdminModule],
  controllers: [AppController],
  providers: [AppService, DatabaseService],
})
export class AppModule {}
