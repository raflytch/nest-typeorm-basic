import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';

@Injectable()
export class ConfigService {
  constructor(private configService: NestConfigService) {}

  get jwtSecret(): string {
    return this.configService.get<string>('JWT_SECRET') || 'default_secret';
  }

  get jwtExpirationTime(): string {
    return this.configService.get<string>('JWT_EXPIRATION_TIME') || '1h';
  }

  get databaseHost(): string {
    return this.configService.get<string>('DB_HOST') || 'localhost';
  }

  get databasePort(): number {
    return this.configService.get<number>('DB_PORT') || 5432;
  }

  get databaseUsername(): string {
    return this.configService.get<string>('DB_USERNAME') || 'postgres';
  }

  get databasePassword(): string {
    return this.configService.get<string>('DB_PASSWORD') || 'password';
  }

  get databaseName(): string {
    return this.configService.get<string>('DB_DATABASE') || 'database';
  }
}
