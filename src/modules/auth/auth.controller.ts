import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '../../common/guards/auth.guard';
/* import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';
import { RolesGuard } from 'src/common/guards/roles.guard'; */
import { SignInDto } from './dto/sign-in.dto';
import { Response } from 'express';
import { DatabaseService } from 'src/database/database.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly databaseService: DatabaseService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  create(@Body() signInDto: SignInDto) {
    return this.authService.validateUser(signInDto);
  }

  @Get('profile')
  @UseGuards(AuthGuard)
  getProfile(@Req() req) {
    if (req.user.roles == 'user') {
      return this.databaseService.students.findUnique({
        where: {
          student_id: req.user.id,
        },
      });
    }
  }
}
