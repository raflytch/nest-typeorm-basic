import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig = (configService): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: configService.get('DB_HOST'),
  port: Number(configService.get('DB_PORT')),
  username: configService.get('DB_USERNAME'),
  password: configService.get('DB_PASSWORD'),
  database: configService.get('DB_DATABASE'),
  autoLoadEntities: true,
  synchronize: true,
});
