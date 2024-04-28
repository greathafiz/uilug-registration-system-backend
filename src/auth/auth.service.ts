import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AdminService } from 'src/admin/admin.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private adminService: AdminService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    username: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    const user = await this.adminService.findOne(username);
    if (user?.password !== pass) {
      throw new UnauthorizedException('Your password is incorrect');
    }

    const payload = { sub: user.admin_id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
