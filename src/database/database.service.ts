import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class DatabaseService extends PrismaClient {}

// To establish a connection immediately the server starts running... don't forget to import 'OnModuleInit'
/* export class DatabaseService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
    console.log(`Database connection successful`);
  }
} */
