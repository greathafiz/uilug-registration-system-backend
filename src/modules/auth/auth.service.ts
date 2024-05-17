import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { AdminService } from 'src/modules/admin/admin.service';
import { JwtService } from '@nestjs/jwt';
import { catchError, firstValueFrom, map } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { AxiosError, AxiosRequestConfig } from 'axios';
import { SignInDto } from './dto/sign-in.dto';
import { Course } from '../../interfaces/course.interface';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private readonly adminService: AdminService,
    private readonly jwtService: JwtService,
    private readonly httpService: HttpService,
    private readonly databaseService: DatabaseService,
  ) {}

  async adminSignIn({
    username,
    password,
  }: SignInDto): Promise<{ access_token: string }> {
    const user = await this.adminService.findOne(username);
    if (user?.password !== password) {
      throw new UnauthorizedException('Your password is incorrect');
    }

    const payload = { username: user.username, roles: 'admin' };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async studentSignIn(username: string): Promise<{ access_token: string }> {
    const payload = { username: username, roles: 'user' };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async validateUser({ username, password }: SignInDto): Promise<object> {
    const admin = await this.adminService.findOne(username);

    if (!admin) {
      const { data, headers } = await firstValueFrom(
        this.httpService
          .post('/login', {
            username,
            password,
          })
          .pipe(
            catchError((error: AxiosError) => {
              this.logger.error(error);
              throw new HttpException(
                `${error}`,
                HttpStatus.INTERNAL_SERVER_ERROR,
              );
            }),
          ),
      );

      if (data) {
        const axiosConfig = this.setRequestHeaders(headers);
        const coursesArray = await firstValueFrom(
          this.httpService
            .get('/courseRegistrations/my-course-registrations', axiosConfig)
            .pipe(
              catchError((error: AxiosError) => {
                this.logger.error(error);
                throw new HttpException(
                  `${error}`,
                  HttpStatus.INTERNAL_SERVER_ERROR,
                );
              }),
              map((response) =>
                response.data.data.map(
                  (course: Course) => course.course.course_code,
                ),
              ),
            ),
        );

        // const courseStatus = coursesArray.includes('GSE301') ? true : false;

        // if (!courseStatus) {
        //   throw new HttpException(
        //     'GSE301 not among registered courses',
        //     HttpStatus.UNAUTHORIZED,
        //   );
        // }

        const studentDetails = {
          full_name: data.data.fullname,
          email: data.data.email,
          matric_number: data.data.student_number,
        };

        await this.databaseService.students.create({
          data: studentDetails,
        });

        return this.studentSignIn(studentDetails.matric_number);
      }
    } else {
      return this.adminSignIn({ username, password });
    }
  }

  setRequestHeaders(headers: object) {
    let axiosConfig: AxiosRequestConfig = {};
    const setCookieHeader = headers['set-cookie'];

    if (!setCookieHeader) {
      throw new HttpException('Auth failed', HttpStatus.UNAUTHORIZED);
    }

    const cookieArray = setCookieHeader.map(
      (header: string) => header.split(';')[0].split('=')[1],
    );

    const cookieHeader = cookieArray
      .map((token: string) => `unilorin_portal_session=${token}`)
      .join('; ');

    axiosConfig = {
      headers: {
        Cookie: cookieHeader,
      },
    };
    return axiosConfig;
  }
}
