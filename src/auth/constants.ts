import { ConfigService } from '@nestjs/config';

export const jwtConstants = {
  secret: new ConfigService().get<string>('JWT_SECRET'),
  expirationTime:
    new ConfigService().get<string>('JWT_EXPIRATION_TIME') || '1h',
};
