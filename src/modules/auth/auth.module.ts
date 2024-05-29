import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AdminModule } from 'src/modules/admin/admin.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { HttpModule } from '@nestjs/axios';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [
    AdminModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: jwtConstants.options,
    }),
    HttpModule.register({
      timeout: 10000,
      maxRedirects: 5,
      baseURL: 'https://portal.unilorin.edu.ng/api',
    }),
    DatabaseModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
