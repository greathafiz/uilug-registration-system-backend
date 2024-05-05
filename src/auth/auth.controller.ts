import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { SignInDto } from './dto/sign-in.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  create(@Body() signInDto: SignInDto) {
    return this.authService.validateUser(signInDto);
  }
  // @Post('login')
  // create(@Body() signInDto: SignInDto) {
  //   return this.authService.logIn(signInDto);
  // }

  /* @Get('dummy')
  findAllCourses() {
    return this.authService.checkCourse();
  } */

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
