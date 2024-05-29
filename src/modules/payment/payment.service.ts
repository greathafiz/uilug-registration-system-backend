import { HttpService } from '@nestjs/axios';
import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { Prisma } from '@prisma/client';

@Injectable()
export class PaymentService {
  private readonly logger = new Logger(PaymentService.name);

  private readonly secretKey: string;
  private readonly callbackUrl: string;

  constructor(private readonly httpService: HttpService) {
    (this.secretKey = process.env.PAYSTACK_SECRET_KEY),
      (this.callbackUrl = process.env.PAYSTACK_CALLBACK_URL);
  }

  async initializePayment(
    user: Prisma.studentsWhereUniqueInput,
    skill_id: number,
  ): Promise<any> {
    const url = '/transaction/initialize';
    const headers = {
      Authorization: `Bearer ${this.secretKey}`,
      'Content-Type': 'application/json',
    };

    const payload = {
      email: user.email,
      amount: 250000,
      callback_url: this.callbackUrl,
      metadata: {
        student_id: user.student_id,
        skill_id: skill_id,
      },
    };

    const { data } = await firstValueFrom(
      this.httpService.post(url, payload, { headers }).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error);
          throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }),
      ),
    );

    return data;
  }

  async verifyPayment(reference: string): Promise<any> {
    const url = `/transaction/verify/${reference}`;
    const headers = {
      Authorization: `Bearer ${this.secretKey}`,
      'Content-Type': 'application/json',
    };

    const { data } = await firstValueFrom(
      this.httpService.get(url, { headers }).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error);
          throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }),
      ),
    );
    return data;
  }
}
