import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { AdminService } from 'src/admin/admin.service';
import { JwtService } from '@nestjs/jwt';
import { catchError, firstValueFrom, map } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { SignInDto } from './dto/sign-in.dto';
import { Course } from '../interfaces/course.interface';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private readonly adminService: AdminService,
    private readonly jwtService: JwtService,
    private readonly httpService: HttpService,
  ) {}

  async signIn({
    username,
    password,
  }: SignInDto): Promise<{ access_token: string }> {
    const user = await this.adminService.findOne(username);
    if (user?.password !== password) {
      throw new UnauthorizedException('Your password is incorrect');
    }

    const payload = { sub: user.admin_id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async validateUser({ username, password }: SignInDto): Promise<any> {
    let axiosConfig: AxiosRequestConfig = {};
    const admin = await this.adminService.findOne(username);

    if (!admin) {
      const { data, headers } = await firstValueFrom(
        this.httpService
          .post<object>('/login', {
            username,
            password,
          })
          .pipe(
            catchError((error: AxiosError) => {
              this.logger.error(error);
              throw new HttpException(`${error}`, HttpStatus.BAD_REQUEST);
            }),
          ),
      );

      const setCookieHeaders = headers['set-cookie'];
      if (setCookieHeaders) {
        const cookieArray = setCookieHeaders.map(
          (header) => header.split(';')[0].split('=')[1],
        );

        const cookieHeader = cookieArray
          .map((token) => `unilorin_portal_session=${token}`)
          .join('; ');

        axiosConfig = {
          headers: {
            Cookie: cookieHeader,
          },
        };
      }

      if (data) {
        const coursesArray = await firstValueFrom(
          this.httpService
            .get('/courseRegistrations/my-course-registrations', axiosConfig)
            .pipe(
              catchError((error: AxiosError) => {
                this.logger.error(error);
                throw new HttpException(error, HttpStatus.UNAUTHORIZED);
              }),
              map((response) =>
                response.data.data.map((course) => course.course.course_code),
              ),
            ),
        );

        // coursesArray.includes("GSE301") ?

        return coursesArray;
      }
    } else {
      return this.signIn({ username, password });
    }
  }
}
